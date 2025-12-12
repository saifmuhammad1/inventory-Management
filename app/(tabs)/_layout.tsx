import { Home } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
  if (Platform.OS === "web") {
    return <WebNavbar />;
  }

  // MOBILE → BOTTOM TABS
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="pages/home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="pages/product/productList"
        options={{ title: "Products" }}
      />
    </Tabs>
  );
}

// WEB NAVBAR
function WebNavbar() {
  return (
    <div
      style={{
        width: "100%",
        padding: 14,
        backgroundColor: "#111",
        color: "white",
        display: "flex",
        gap: 20,
      }}
    >
      <a href="/(tabs)/home">Home</a>
      <a href="/(tabs)/productList">Products</a>
    </div>
  );
}
