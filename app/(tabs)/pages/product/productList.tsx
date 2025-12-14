import { SearchBar } from "@/app/components/searchBar";
import { useToast } from "@/app/components/toastProvider";
import {
  deleteImage,
  deleteProduct,
  getImageUrl,
  getProducts,
} from "@/appwrite/product";
import { IProduct } from "@/types/productTypes";
import { useFocusEffect } from "@react-navigation/native";
import { Edit3, Trash2 } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Image, Text, XStack, YStack } from "tamagui";

const ProductList = () => {
  const route = useRouter();
  const [search, setSerach] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { showToast } = useToast();
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ search });
      const mappedProducts = res.documents.map((doc) => ({
        $id: doc.$id,
        name: doc.name,
        price: doc.price,
        quantity: doc.quantity,
        category: doc.category,
        imageId: doc.imageId,
      }));
      setProducts(mappedProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handelEdit = (id: string) => {
    route.replace(`/pages/product/productFromContainer/${id}`);
  };
  const deleteFile = async (imageId?: string) => {
    if (!imageId) return;

    try {
      await deleteImage(imageId);
    } catch (error: any) {
      if (error.code !== 404) {
        throw error;
      }
    }
  };

  const handleProductDelete = async (id: string, imageId?: string) => {
    try {
      await deleteFile(imageId);

      await deleteProduct(id);

      await fetchProducts();

      showToast("Product Deleted", "success");
    } catch (error) {
      console.error("Delete failed:", error);
      showToast(`Delete failed:${error}`, "error");
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [search])
  );
  return (
    <YStack bg="#fff" f={1} pt="$10">
      <XStack jc="space-between" ai="center" p="$3">
        <Text fontSize={20} fontWeight={100}>
          Product Management
        </Text>
        <Button
          onPress={() => route.push("/pages/product/productFromContainer/new")}
          bg="#1D61E7"
          color="#fff"
          w="30%"
        >
          Create
        </Button>
      </XStack>

      <SearchBar
        value={search}
        onChange={setSerach}
        onSearch={handleSearch}
        loading={loading}
        placeholder="Search products..."
      />

      <YStack f={1}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {products.map((obj: IProduct) => (
            <YStack key={obj.$id} mb="$4">
              <XStack
                borderWidth={1}
                borderColor="#1D61E7"
                padding="$4"
                jc="space-between"
                ai="center"
                borderRadius="$4"
              >
                <YStack space="$3" ai="flex-start">
                  <XStack space="$2" ai="center">
                    <Text fontSize={20} color="#6d6d6d">
                      Name:
                    </Text>
                    <Text fontSize={28}>{obj.name}</Text>
                  </XStack>

                  <XStack space="$2" ai="center">
                    <Text fontSize={20} color="#6d6d6d">
                      Category:
                    </Text>
                    <Text fontSize={28}>{obj.category}</Text>
                  </XStack>

                  <XStack space="$2" ai="center">
                    <Text fontSize={20} color="#6d6d6d">
                      Quantity:
                    </Text>
                    <Text fontSize={28}>{obj.quantity}</Text>
                  </XStack>

                  <XStack space="$2">
                    <Button
                      icon={Edit3}
                      borderColor="#1D61E7"
                      color="#1D61E7"
                      bg="transparent"
                      onPress={() => handelEdit(obj.$id!)}
                    />

                    <Button
                      icon={Trash2}
                      borderColor="red"
                      color="red"
                      bg="transparent"
                      onPress={() => handleProductDelete(obj.$id!, obj.imageId)}
                    />
                  </XStack>
                </YStack>

                <YStack space="$2" ai="flex-end">
                  {obj.imageId ? (
                    <Image
                      source={{ uri: getImageUrl(obj.imageId) }}
                      style={{ width: 120, height: 120, borderRadius: 8 }}
                    />
                  ) : (
                    <Text>No Image</Text>
                  )}

                  <XStack space="$2" ai="center">
                    <Text fontSize={20} color="#6d6d6d">
                      Price:
                    </Text>
                    <Text fontSize={28}>-/{obj.price}</Text>
                  </XStack>
                </YStack>
              </XStack>
            </YStack>
          ))}
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default ProductList;
