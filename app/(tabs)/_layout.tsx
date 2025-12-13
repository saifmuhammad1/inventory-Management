import { Home } from "@tamagui/lucide-icons";
import { Link, Tabs } from "expo-router";
import { Platform } from "react-native";
import { Text, View } from "tamagui";

export default function TabsLayout() {
  return (
    <>
      {Platform.OS === "web" && <WebNavbar />}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: Platform.OS === "web" ? { display: "none" } : undefined,
        }}
      >
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

function WebNavbar() {
  return (
    <View
      style={{
        width: "100%",
        padding: 14,
        backgroundColor: "#1D61E7",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
        InventPro
      </Text>

      <View style={{ flexDirection: "row", gap: 16 }}>
        <Link href="/pages/home" style={{ color: "#fff" }}>
          Home
        </Link>
        <Link href="/pages/product/productList" style={{ color: "#fff" }}>
          Products
        </Link>
      </View>
    </View>
  );
}
