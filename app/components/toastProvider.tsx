import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";
import { Text, YStack } from "tamagui";

type ToastType = "success" | "error" | "info";

type ToastContextType = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

type ToastProviderProps = { children: ReactNode };

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; type?: ToastType; duration?: number }[]
  >([]);

  const showToast = (
    message: string,
    type: ToastType = "success",
    duration = 2000
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ----- CustomToast component inside ToastProvider -----
  const CustomToast = ({
    message,
    type = "success",
    duration = 2000,
    onHide,
  }: {
    message: string;
    type?: ToastType;
    duration?: number;
    onHide?: () => void;
  }) => {
    const [visible, setVisible] = useState(true);
    const slideAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
      // slide down
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // hide after duration
      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          onHide?.();
        });
      }, duration);

      return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    const bgColor =
      type === "success" ? "#1D61E7" : type === "error" ? "#FF6B6B" : "#6d6d6d";

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          right: 20,
          transform: [{ translateY: slideAnim }],
          zIndex: 999,
        }}
      >
        <YStack
          p="$3"
          br="$4"
          bg={bgColor}
          shadowColor="#000"
          shadowOpacity={0.3}
          shadowOffset={{ width: 0, height: 2 }}
          shadowRadius={4}
          elevation={5}
        >
          <Text color="#fff" fontSize={16}>
            {message}
          </Text>
        </YStack>
      </Animated.View>
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Render all active toasts */}
      {toasts.map((t) => (
        <CustomToast
          key={t.id}
          message={t.message}
          type={t.type}
          duration={t.duration}
          onHide={() => removeToast(t.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};
