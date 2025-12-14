import * as ImagePicker from "expo-image-picker";

export interface ImageFile {
  uri: string;
  name: string;
  type: string;
  size: number;
}

export const pickImage = async (): Promise<ImageFile | null> => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert("Permission required");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
    base64: false,
  });

  if (result.canceled || !result.assets?.[0]) return null;

  const asset = result.assets[0];

  return {
    uri: asset.uri,
    name: `image-${Date.now()}.jpg`,
    type: "image/jpeg",
    size: asset.fileSize ?? 1,
  };
};
