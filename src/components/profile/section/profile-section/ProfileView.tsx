import { Mail, User } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { UserInfo } from "./ProfileSection";

export default function ProfileView({ user }: { user: UserInfo }) {
  const infoRow = [
    { label: "Full Name", info: user.name, icon: User },
    { label: "Email Address", info: user.email, icon: Mail },
  ];

  return (
    <div className="space-y-8">
      {/* Avatar Display */}
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-5xl font-bold text-text-primary">
              {user.image ? (
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
        </div>
        <h3 className="text-3xl font-bold text-text-primary mb-2">
          Hey {user.name.split(" ")[0]}!
        </h3>
        <p className="text-text-secondary">Member since {user.memberSince}</p>
      </div>

      {/* Info Display */}
      <div className="space-y-4">
        {infoRow.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
          >
            <div className="p-3 rounded-lg bg-primary/10">
              <r.icon size={22} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-text-secondary">{r.label}</p>
              <p className="text-text-primary font-semibold text-lg">
                {r.info}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
