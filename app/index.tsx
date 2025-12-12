import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const Pages = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, []);

  return <View></View>;
};

export default Pages;
