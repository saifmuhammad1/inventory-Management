import {
  Home,
  SoapDispenserDroplet,
  SquareArrowRight,
} from "@tamagui/lucide-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: () => (
            <LinearGradient
              colors={["#1CE6DA", "#2567E8"]}
              start={[1, 0]}
              end={[1, 1]}
              style={{ flex: 1 }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="pages/home"
          options={{
            title: "Home",

            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#ccc",

            tabBarIcon: ({ size }) => <Home color="#fff" size={size} />,
          }}
        />
        <Tabs.Screen
          name="pages/product/productList"
          options={{
            title: "Products",
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#ccc",
            tabBarIcon: ({ size }) => (
              <SoapDispenserDroplet color="#fff" size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="pages/logout"
          options={{
            title: "Logout",
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#ccc",
            tabBarIcon: ({ size }) => (
              <SquareArrowRight color="#fff" size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="pages/product/productFromContainer/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
