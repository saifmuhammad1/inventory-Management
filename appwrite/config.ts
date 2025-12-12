import { Account, Client, Databases, Storage } from "react-native-appwrite";

export const appwriteClient = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("693bac87000274a1e003");

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);
export const storage = new Storage(appwriteClient);
