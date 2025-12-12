import { registerUser } from "@/appwrite/auth";
import { SignInScheme } from "@/schema/loginSchema";
import { ISignIn } from "@/types/loginInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeft } from "@tamagui/lucide-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, SizableText, Text, XStack, YStack } from "tamagui";

import z from "zod";

type TAddFormValues = z.infer<typeof SignInScheme>;
function Signin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    control,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<TAddFormValues>({
    resolver: zodResolver(SignInScheme),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: ISignIn) => {
    console.log(data, "the isbefore s try");
    try {
      console.log(data, "the iss");
      await registerUser(data);
      alert("User Created");
      router.replace("/auth/login");
    } catch (err: any) {
      alert(err.message);
    }
  };
  console.log(errors);
  return (
    <YStack f={1}>
      <LinearGradient
        colors={["#2567E8", "#1CE6DA"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ flex: 1 }}
      >
        <YStack f={1} jc="center" ai="center" p="$4" gap="$3">
          <YStack
            ai="center"
            w="90%"
            maxWidth={350}
            bg="#fff"
            br="$4"
            p="$8"
            space="$3"
            borderRadius="$5"
          >
            <YStack ai="flex-start" jc="center" space="$2" width="100%">
              {/* <Link icon={ArrowBigLeft}> */}
              <Link href={"/auth/login"}>
                <ArrowBigLeft />
              </Link>
              <Text fontSize={50} fontWeight={600} color="#0a0a0aff">
                Sign Up
              </Text>
              <XStack ai="center" jc="center" gap="$2">
                <Text fontSize={15} fontWeight="700">
                  Already Have A Account?
                </Text>
                <Link href="/auth/login">
                  <Text fontSize={15} fontWeight="300" color="#0F00B4">
                    Log In
                  </Text>
                </Link>
              </XStack>
            </YStack>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    placeholder="Name"
                    onChangeText={field.onChange}
                    value={field.value}
                    w="100%"
                  />
                  {errors.email && (
                    <Text color="red">{errors.name?.message}</Text>
                  )}
                </>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    placeholder="Email"
                    onChangeText={field.onChange}
                    value={field.value}
                    w="100%"
                  />
                  {errors.email && (
                    <Text color="red">{errors.email.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    placeholder="***********"
                    onChangeText={field.onChange}
                    value={field.value}
                    w="100%"
                  />
                  {errors.email && (
                    <Text color="red">{errors.password?.message}</Text>
                  )}
                </>
              )}
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              bg="#1D61E7"
              w="100%"
              jc="center"
              p="$3"
              br="$4"
            >
              <SizableText fontSize={16} color="#fff">
                Sign In
              </SizableText>
            </Button>
          </YStack>
        </YStack>
      </LinearGradient>
    </YStack>
  );
}

export default Signin;
