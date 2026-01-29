import { getCloudinarySignature } from "@/src/lib/actions/cloudinary";

export async function uploadAvatar(
  file: File,
  userId: string,
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid image type");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Image must be under 2MB");
  }

  const { signature, timestamp, cloudName, apiKey } =
    await getCloudinarySignature(userId);

  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("api_key", apiKey);
  uploadForm.append("signature", signature);
  uploadForm.append("timestamp", timestamp.toString());
  uploadForm.append("folder", "avatars");
  uploadForm.append("public_id", userId);
  uploadForm.append("overwrite", "true");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: uploadForm,
    },
  );

  if (!res.ok) {
    throw new Error("Avatar upload failed");
  }

  const data = await res.json();

  return data.secure_url as string;
}
