import { useRootNavigationState, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const Pages = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  useEffect(() => {
    if (!navigationState?.key) return;
    router.replace("/auth/login");
  }, [navigationState]);

  return <View></View>;
};

export default Pages;
