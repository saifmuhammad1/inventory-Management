import { ISignIn } from "@/types/loginInterface";
import { account } from "./config";

export const registerUser = async ({ email, password, name }: ISignIn) => {
  return await account.create("unique()", email, password, name);
};

export const loginUser = async (email: string, password: string) => {
  return await account.createEmailPasswordSession(email, password);
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};
export const logoutUser = async () => {
  return await account.deleteSessions();
};
