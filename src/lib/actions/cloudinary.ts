"use server";

import crypto from "crypto";

export async function getCloudinarySignature(userId: string) {
  const timestamp = Math.round(Date.now() / 1000);

  const paramsToSign = {
    folder: "avatars",
    overwrite: "true",
    public_id: userId,
    timestamp,
  };

  const sortedParams = Object.entries(paramsToSign)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(sortedParams + process.env.CLOUDINARY_API_SECRET!)
    .digest("hex");

  return {
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
  };
}
