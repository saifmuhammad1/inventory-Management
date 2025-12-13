import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, YStack } from "tamagui";

const ProductList = () => {
  const route = useRouter();
  return (
    <YStack bg="#fff" f={1}>
      <Text color="#020202ff">Hiii</Text>
      <Button
        onPress={() => route.push("/pages/product/productFromContainer/new")}
      >
        Create
      </Button>
    </YStack>
  );
};

export default ProductList;
