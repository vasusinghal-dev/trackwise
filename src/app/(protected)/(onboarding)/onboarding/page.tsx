// app/onboarding/page.tsx
"use client";

import AddApplicationScreen from "@/src/components/onboarding/AddApplicationScreen";
import DashboardRedirect from "@/src/components/onboarding/DashboardRedirect";
import WelcomeScreen from "@/src/components/onboarding/WelcomeScreen";
import { useState } from "react";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleCreateApplication = () => {
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {currentStep === 1 && <WelcomeScreen onContinue={handleContinue} />}
      {currentStep === 2 && (
        <AddApplicationScreen onCreate={handleCreateApplication} />
      )}
      {currentStep === 3 && <DashboardRedirect />}
    </div>
  );
}
