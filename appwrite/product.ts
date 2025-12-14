import { APPWRITE_BUCKET_ID, APPWRITE_DATABASE_ID } from "@env";
import { ID, Query } from "react-native-appwrite";
import { databases, storage } from "./config";

export const createProduct = async (data: any) => {
  return await databases.createDocument(
    APPWRITE_DATABASE_ID,
    "products",
    "unique()",
    data
  );
};

export const updateProduct = async (id: string, data: any) => {
  return await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    "products",
    id,
    data
  );
};

export const deleteProduct = async (id: string) => {
  return await databases.deleteDocument(APPWRITE_DATABASE_ID, "products", id);
};

export const getProductById = async (id: string) => {
  return await databases.getDocument(APPWRITE_DATABASE_ID, "products", id);
};

export const uploadImage = async (file: {
  uri: string;
  name: string;
  type: string;
  size: number;
}): Promise<string> => {
  const uploaded = await storage.createFile(
    APPWRITE_BUCKET_ID,
    ID.unique(),
    file
  );
  return uploaded.$id;
};

export const updateImage = async (
  file: { uri: string; name: string; type: string; size: number },
  fileId: string
): Promise<string> => {
  try {
    const uploaded = await storage.updateFile(
      APPWRITE_BUCKET_ID,
      fileId,
      file.uri
    );

    return uploaded.$id;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

export const deleteImage = async (fileId: string): Promise<void> => {
  try {
    console.log(fileId, "the file is is");
    await storage.deleteFile(APPWRITE_BUCKET_ID, fileId);
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

export const getProducts = async ({ search = "" }: { search?: string }) => {
  const queries = [];

  if (search) {
    queries.push(Query.search("name", search));
  }

  return databases.listDocuments(APPWRITE_DATABASE_ID, "products", queries);
};

export const getImageUrl = (fileId: string) => {
  const endpoint = "https://fra.cloud.appwrite.io/v1";
  const projectId = "693bac87000274a1e003";
  const bucketId = APPWRITE_BUCKET_ID;

  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};
