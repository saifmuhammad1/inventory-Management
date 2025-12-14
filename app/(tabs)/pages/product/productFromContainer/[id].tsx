import { pickImage } from "@/app/components/imageHelper";
import { useToast } from "@/app/components/toastProvider";
import {
  createProduct,
  deleteImage,
  getImageUrl,
  getProductById,
  updateProduct,
  uploadImage,
} from "@/appwrite/product";
import { productSchema } from "@/schema/productSchema";
import { IProduct } from "@/types/productTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "@tamagui/lucide-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Image, Input, Spinner, Text, XStack, YStack } from "tamagui";
import z from "zod";

type TAddFormValues = z.infer<typeof productSchema>;
type ImageFile = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

const ProductFromContainer = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [initialImage, SetInitailImage] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAddFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      quantity: 0,
      imageId: "",
    },
  });

  const onSubmit = async (data: TAddFormValues) => {
    try {
      let imageId: string | undefined;

      if (imageFile && !initialImage) {
        imageId = await uploadImage(imageFile);
      } else if (imageFile && initialImage) {
        await deleteImage(data.imageId!);
        imageId = await uploadImage(imageFile);
      }
      const payload: IProduct = {
        ...data,
        imageId,
      };
      if (id !== "new") {
        const result = await updateProduct(id!, payload);
        showToast("Product Updated successfully", "success");
        reset();
        setImageFile(null);
        SetInitailImage(false);
        router.push("../productList");
        return;
      }

      const result = await createProduct(payload);

      showToast("Product created successfully", "success");
      reset();
      setImageFile(null);
      SetInitailImage(false);
      router.push("../productList");
      return;
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  const handlePickImage = async () => {
    const file = await pickImage();
    if (file) {
      setImageFile(file);
    }
  };

  const handleProductData = async (id: string) => {
    try {
      const result = await getProductById(id);
      reset(result);
      if (result.imageId) {
        const imageUrl = getImageUrl(result.imageId);
        setImageFile({
          uri: imageUrl,
          name: "",
          size: 1,
          type: "",
        });
        SetInitailImage(true);
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (id !== "new") {
      handleProductData(id!);
      return;
    }
    reset({
      name: "",
      category: "",
      quantity: 0,
      price: 0,
    });
    setImageFile(null);
    SetInitailImage(false);
    return;
  }, [id]);

  const handelReset = () => {
    showToast("Data Reseted");
    if (id !== "new") {
      handleProductData(id!);

      return;
    }
    reset({
      name: "",
      category: "",
      quantity: 0,
      price: 0,
    });
    setImageFile(null);
    return;
  };
  return (
    <YStack f={1} bg="#fff">
      <YStack
        h="26%"
        borderBottomLeftRadius={40}
        borderBottomRightRadius={40}
        overflow="hidden"
        shadowColor="#000"
        shadowOpacity={0.2}
        shadowOffset={{ width: 0, height: 3 }}
        shadowRadius={5}
        elevation={5}
      >
        <LinearGradient
          colors={["#2567E8", "#1CE6DA"]}
          start={[0, 0]}
          end={[0, 1]}
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <Button
            icon={MoveLeft}
            scaleIcon={2}
            onPress={() => router.push("../productList")}
            bg="#fff"
            color="#1D61E7"
            borderRadius={16}
            p="$2"
            circular
            mb="$2"
          />

          <Text fontSize={36} fontWeight="700" color="#fff">
            {id === "new" ? "Add Product" : "Edit Product"}
          </Text>
          <Text fontSize={18} fontWeight="500" color="#f3f3f3">
            {id === "new"
              ? "Add a new product to inventory"
              : "Edit your product details"}
          </Text>
        </LinearGradient>
      </YStack>

      <YStack mt="$10" gap={20} p="$3" as="form">
        <XStack space="$4">
          <YStack flex={2} space="$3">
            <YStack>
              <Text fontWeight="600">Product Name</Text>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    placeholder="Product Name"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.name && <Text color="red">{errors.name.message}</Text>}
            </YStack>

            <YStack>
              <Text fontWeight="600">Price</Text>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <Input
                    placeholder="Price"
                    keyboardType="numeric"
                    value={String(field.value)}
                    onChangeText={(v: any) => field.onChange(Number(v))}
                  />
                )}
              />
              {errors.price && <Text color="red">{errors.price.message}</Text>}
            </YStack>

            <YStack>
              <Text fontWeight="600">Quantity</Text>
              <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                  <Input
                    placeholder="Quantity"
                    keyboardType="numeric"
                    value={String(field.value)}
                    onChangeText={(v: any) => field.onChange(Number(v))}
                  />
                )}
              />
              {errors.quantity && (
                <Text color="red">{errors.quantity.message}</Text>
              )}
            </YStack>

            <YStack>
              <Text fontWeight="600">Category</Text>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Input
                    placeholder="Category"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.category && (
                <Text color="red">{errors.category.message}</Text>
              )}
            </YStack>
          </YStack>

          <YStack flex={1} ai="center" jc="flex-start" space="$3">
            {imageFile ? (
              <Image
                source={{ uri: imageFile.uri }}
                width={120}
                height={120}
                borderRadius={8}
              />
            ) : (
              <Text>No image selected</Text>
            )}
            <Button onPress={handlePickImage} bg="#1D61E7" color="#fff">
              Pick Image
            </Button>
          </YStack>
        </XStack>

        <XStack space="$3" mt="$4" w="100%">
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            color="#fff"
            bg="#1D61E7"
            size="$5"
            borderRadius="$4"
            borderWidth={2}
          >
            {isSubmitting ? <Spinner color="green" /> : "Submit"}
          </Button>

          <Button
            onPress={() => (router.back ? router.back() : null)}
            borderColor="red"
            color="red"
            size="$5"
            borderRadius="$4"
            borderWidth={2}
            bg="transparent"
          >
            Cancel
          </Button>

          <Button
            onPress={handelReset}
            borderColor="green"
            color="green"
            size="$5"
            borderRadius="$4"
            borderWidth={2}
            bg="transparent"
          >
            Reset
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ProductFromContainer;
