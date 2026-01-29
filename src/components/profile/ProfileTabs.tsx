import { ProfileTab } from "@/src/app/(protected)/(dashboard)/dashboard/profile/page";
import { Settings, Shield, User } from "lucide-react";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
};

type NavigationTabs = {
  id: ProfileTab;
  label: string;
  icon: React.ElementType;
};

export default function ProfileTabs({
  activeTab,
  setActiveTab,
}: ProfileTabsProps) {
  const navigationTabs: NavigationTabs[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="flex border-b border-border">
      {navigationTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all relative ${
            activeTab === tab.id
              ? "text-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          <tab.icon size={16} />
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
          )}
        </button>
      ))}
    </div>
  );
}
