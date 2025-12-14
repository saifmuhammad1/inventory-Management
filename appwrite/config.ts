import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@env";
import { Account, Client, Databases, Storage } from "react-native-appwrite";
export const appwriteClient = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);
export const storage = new Storage(appwriteClient);
