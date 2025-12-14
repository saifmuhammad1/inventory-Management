import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";

const Home = () => {
  const dropAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(dropAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <YStack f={1} bg="rgba(255, 255, 255, 1)" gap={3}>
      <Animated.View
        style={{
          transform: [{ translateY: dropAnim }],
          height: "40%",
          width: "100%",
        }}
      >
        <YStack
          h="100%"
          borderBottomLeftRadius={40}
          borderBottomRightRadius={40}
          overflow="hidden"
        >
          <LinearGradient
            colors={["#2567E8", "#1CE6DA"]}
            start={[0, 0]}
            end={[0, 1]}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 20,
            }}
          >
            <Text fontSize={48} fontWeight="800" color="#fff">
              Welcome 👋
            </Text>

            <Text fontSize={16} color="#f3f3f3" textAlign="left" mt="$2">
              Manage your products easily and efficiently
            </Text>

            <YStack w="100%" space="$2" mt="$4">
              <Text fontSize={18} fontWeight="500">
                InventPro
              </Text>
              <Text fontSize={14} color="#6d6d6d">
                Add, edit, delete and search products in one place.
              </Text>
            </YStack>
          </LinearGradient>
        </YStack>
      </Animated.View>
      <YStack space="$3" w="100%" mt="$4">
        <XStack space="$3" w="100%" p={10}>
          <Button flex={1} h={100} bg="#1D61E7" color="#fff">
            Product
          </Button>
          <Button flex={1} h={100} bg="#FF6B6B" color="#fff">
            Inventory
          </Button>
        </XStack>

        <XStack space="$3" w="100%" p={10}>
          <Button flex={1} h={100} bg="#1DD3CE" color="#fff">
            Category
          </Button>
          <Button flex={1} h={100} bg="#FFA500" color="#fff">
            Profit
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default Home;
