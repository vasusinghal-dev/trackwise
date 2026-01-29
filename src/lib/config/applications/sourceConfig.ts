import { Source } from "@prisma/client";

export const sourceConfig: Record<Source, { label: string; color: string }> = {
  LINKEDIN: { label: "LinkedIn", color: "text-blue-600" },
  COMPANY_SITE: { label: "Company Site", color: "text-gray-600" },
  REFERRAL: { label: "Referral", color: "text-green-600" },
  EMAIL: { label: "Email", color: "text-red-600" },
  COLD_APPLICATION: { label: "Cold Application", color: "text-yellow-600" },
  RECRUITER: { label: "Recruiter", color: "text-purple-600" },
  JOB_BOARD: { label: "Job Board", color: "text-orange-600" },
  OTHER: { label: "Other", color: "text-gray-500" },
};
