import { logoutUser } from "@/appwrite/auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutUser();
      } catch (err) {
        console.log(err);
      } finally {
        router.replace("/auth/login");
      }
    };

    logout();
  }, []);

  return null;
}
