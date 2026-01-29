import { authClient } from "../../auth/auth-client";

export async function updateProfile({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  const { error } = await authClient.updateUser({
    name,
    image,
  });

  if (error) {
    throw new Error(error.message || "Failed to update profile");
  }
}
