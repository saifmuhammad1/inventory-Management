import { databases, storage } from "./config";

export const createProduct = async (data: any) => {
  return await databases.createDocument(
    "databaseID",
    "collectionID",
    "unique()",
    data
  );
};

export const updateProduct = async (id: string, data: any) => {
  return await databases.updateDocument("databaseID", "collectionID", id, data);
};

export const deleteProduct = async (id: string) => {
  return await databases.deleteDocument("databaseID", "collectionID", id);
};

export const getProductById = async (id: string) => {
  return await databases.getDocument("databaseID", "collectionID", id);
};

export const uploadImage = async (uri: string): Promise<string> => {
  const filename = uri.split("/").pop()!;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : "image/jpeg";

  const file = {
    uri,
    name: filename,
    type,
    size: 0,
  };
  const uploaded = await storage.createFile("bucketID", "unique()", file);
  return uploaded.$id;
};
