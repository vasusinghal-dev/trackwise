import { Camera, Check, RefreshCw, X } from "lucide-react";
import { UserInfo } from "./ProfileSection";
import { useEffect, useRef, useState } from "react";
import { CldImage } from "next-cloudinary";
import { toast } from "sonner";
import gsap from "gsap";

export default function ProfileEditForm({
  user,
  isSaving,
  onSave,
  onCancel,
}: {
  user: UserInfo;
  isSaving: boolean;
  onSave: (data: { name: string; avatarFile?: File }) => void;
  onCancel: () => void;
}) {
  const formRef = useRef<HTMLDivElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [avatarFile, setAvatarFile] = useState<File>();

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3 },
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:"))
        URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name") as string;
    if (!name.trim()) {
      toast.error("Name is required!");
      return;
    }

    if (!avatarFile && name === user.name) {
      toast.info("No changes to save");
      return;
    }

    onSave({ name: name.trim(), avatarFile });

    setAvatarFile(undefined);
  }

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : user.image ? (
                  <CldImage
                    src={user.image}
                    width={160}
                    height={160}
                    crop="fill"
                    gravity="face"
                    alt="Avatar"
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-5xl font-bold">{user.name[0]}</span>
                )}
              </div>
            </div>
            <label className="absolute bottom-4 right-4 p-3 bg-surface border border-border rounded-full cursor-pointer hover:bg-background transition-all hover:scale-110 shadow-lg">
              <Camera size={20} className="text-text-primary" />
              <input
                name="image"
                type="file"
                disabled={isSaving}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setAvatarFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>
        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={user.name}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Email Address
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                value={user.email}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-text-secondary focus:outline-none cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Contact support to change your email address
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="save-button disabled:opacity-60 disabled:cursor-not-allowed flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all hover:scale-[1.02] font-semibold shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setAvatarFile(undefined);
                setAvatarPreview(undefined);
                onCancel();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border border-border text-text-primary rounded-xl hover:bg-surface transition-all font-medium"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
