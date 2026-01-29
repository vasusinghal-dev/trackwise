"use client";

import { useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { Edit2 } from "lucide-react";
import { authClient } from "@/src/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProfileView from "./ProfileView";
import ProfileEditForm from "./ProfileEditForm";
import { monthYearFormat } from "@/src/lib/utils/date";
import { uploadAvatar } from "@/src/lib/utils/profile/uploadAvatar";
import { updateProfile } from "@/src/lib/utils/profile/updateProfile";

export type UserInfo = {
  userId: string;
  name: string;
  email: string;
  image?: string;
  memberSince: string;
};

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: session,
    isPending: loading,
    refetch,
  } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) router.replace("/auth?mode=signin");
  }, [loading, session, router]);

  const user = useMemo((): UserInfo | null => {
    if (!session) return null;

    return {
      userId: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image ?? undefined,
      memberSince: monthYearFormat(session.user.createdAt),
    };
  }, [session]);

  if (loading || !user) return null;

  const handleSave = async ({
    name,
    avatarFile,
  }: {
    name: string;
    avatarFile?: File;
  }) => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      let imageURL: string | undefined;

      if (avatarFile) {
        imageURL = await uploadAvatar(avatarFile, user.userId);
      }

      await updateProfile({ name, image: imageURL });

      await refetch();
      setIsEditing(false);

      gsap.to(".save-button", {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-primary">
            Personal Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all hover:scale-105"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <ProfileEditForm
            user={user}
            isSaving={isSaving}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <ProfileView user={user} />
        )}
      </div>
    </div>
  );
}
