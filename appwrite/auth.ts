import { ISignIn } from "@/types/loginInterface";
import { account } from "./config";

export const registerUser = async ({ email, password, name }: ISignIn) => {
  return await account.create("unique()", email, password, name);
};

export const loginUser = async (email: string, password: string) => {
  return await account.createEmailPasswordSession(email, password);
};

// export const getUser = async () => {
//   return await account.get();
// };

export const logoutUser = async () => {
  return await account.deleteSessions();
};
