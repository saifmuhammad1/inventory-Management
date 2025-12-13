import { productSchema } from "@/schema/productSchema";
import { IProduct } from "@/types/productTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Image, Input, Spinner, Text, XStack, YStack } from "tamagui";
import z from "zod";

type TAddFormValues = z.infer<typeof productSchema>;

const ProductFromContainer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [imageUri, setImageUri] = useState<string | null>(null);
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

  const onSubmit = async (data: IProduct) => {
    console.log(data);
  };

  const fields = [
    { name: "name", placeholder: "Product Name", type: "text" },
    { name: "price", placeholder: "Price", type: "number" },
    { name: "quantity", placeholder: "Quantity", type: "number" },
    { name: "category", placeholder: "Category", type: "text" },
    { name: "imageId", placeholder: "Image ID", type: "text" },
  ];
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <YStack
      f={1}
      bg="#fff"
      jc="start"
      $sm={{ jc: "center", ai: "center" }}
      gap="$4"
      onSubmit={handleSubmit(onSubmit)}
      p="$8"
      as="form"
    >
      <XStack flexWrap="wrap" gap="$3">
        {fields.map((field) => (
          <YStack key={field.name} width="20%" $sm={{ width: "100%" }} gap="$2">
            <Text fontWeight="500">{field.placeholder}</Text>

            <Controller
              control={control}
              name={field.name as keyof TAddFormValues}
              render={({ field: controllerField }) => (
                <Input
                  placeholder={field.placeholder}
                  {...controllerField}
                  keyboardType={field.type === "number" ? "numeric" : "default"}
                />
              )}
            />

            {errors[field.name as keyof TAddFormValues] && (
              <Text color="red">
                {errors[field.name as keyof TAddFormValues]?.message as string}
              </Text>
            )}
          </YStack>
        ))}
      </XStack>
      <YStack width="100%" gap="$2" ai="center">
        <Button onPress={pickImage}>Pick Image</Button>
        {imageUri && (
          <Image src={imageUri} width={100} height={100} borderRadius={8} />
        )}
      </YStack>

      <Button theme="blue" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Submit"}
      </Button>
    </YStack>
  );
};

export default ProductFromContainer;
