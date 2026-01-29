"use client";

import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileTabs from "@/src/components/profile/ProfileTabs";
import ProfileSection from "@/src/components/profile/section/profile-section/ProfileSection";
import PreferenceSection from "@/src/components/profile/section/PreferenceSection";
import { useEffect, useRef, useState } from "react";
import SecuritySection from "@/src/components/profile/section/securtiy-section/SecuritySection";
import gsap from "gsap";

export type ProfileTab = "profile" | "preferences" | "security";

export default function ProfileSettingsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 },
    );
  }, []);

  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  return (
    <div ref={contentRef} className="flex justify-center">
      <div className="max-w-6xl w-full p-4 md:p-6">
        <div className="mb-8">
          <ProfileHeader />
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "preferences" && <PreferenceSection />}
        {activeTab === "security" && <SecuritySection />}
      </div>
    </div>
  );
}
