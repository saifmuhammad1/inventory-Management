import { loginUser } from "../../appwrite/auth";

import { LoginScheme } from "@/schema/loginSchema";
import { ILogin } from "@/types/loginInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, SizableText, Text, XStack, YStack } from "tamagui";
import z from "zod";
import { useToast } from "../components/toastProvider";

type TAddFormValues = z.infer<typeof LoginScheme>;

export default function LoginScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,

    control,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<TAddFormValues>({
    resolver: zodResolver(LoginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILogin) => {
    try {
      await loginUser(data.email, data.password);
      showToast("Loggin Successfull", "success");
      router.replace("../(tabs)/pages/home");
    } catch (err: any) {
      alert(err.message);
    }
  };
  // const logOut = async () => {
  //   try {
  //     await logoutUser();
  //     alert("pout in");
  //   } catch (err: any) {
  //     alert(err.message);
  //   }
  // };

  return (
    <YStack f={1}>
      <LinearGradient
        colors={["#2567E8", "#1CE6DA"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ flex: 1 }}
      >
        <YStack f={1} jc="center" ai="center" p="$4" gap="$3">
          <Text fontSize={50} fontWeight={600} color="#fff">
            InventPro
          </Text>

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
            <Text fontSize={40} fontWeight="700" mb="$2" textAlign="center">
              Login
            </Text>

            <XStack ai="center" jc="center" gap="$2">
              <Text fontSize={15} fontWeight="700">
                Don’t have an account?
              </Text>
              <Link href="/auth/signin">
                <Text fontSize={15} fontWeight="300" color="#0F00B4">
                  Sign In
                </Text>
              </Link>
            </XStack>

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
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={field.onChange}
                    value={field.value}
                    w="100%"
                  />
                  {errors.password && (
                    <Text color="red">{errors.password.message}</Text>
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
                Login
              </SizableText>
            </Button>
            {/* <Button
              // onPress={handleSubmit(onSubmit)}
              onPress={logOut}
              bg="#1D61E7"
              w="100%"
              jc="center"
              p="$3"
              br="$4"
            >
              <SizableText fontSize={16} color="#fff">
                Logout
              </SizableText>
            </Button> */}
          </YStack>
        </YStack>
      </LinearGradient>
    </YStack>
  );
}
