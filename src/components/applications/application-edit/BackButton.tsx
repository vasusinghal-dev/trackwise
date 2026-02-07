"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="p-2 hover:bg-background rounded-lg transition-colors"
    >
      <ArrowLeft className="w-5 h-5 text-text-secondary" />
    </button>
  );
}
