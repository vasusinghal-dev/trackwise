import { ActivityType } from "@prisma/client";

export const ACTIVITY_COLORS: Record<ActivityType, string> = {
  APPLICATION_SUBMITTED: "bg-blue-600 text-white",
  FOLLOW_UP_SENT: "bg-purple-600 text-white",
  FOLLOW_UP_RECEIVED: "bg-purple-500 text-white",
  INTERVIEW_SCHEDULED: "bg-green-600 text-white",
  INTERVIEW_COMPLETED: "bg-emerald-600 text-white",
  INTERVIEW_PREPARED: "bg-amber-600 text-white",
  OFFER_RECEIVED: "bg-teal-600 text-white",
  OFFER_ACCEPTED: "bg-teal-700 text-white",
  REJECTION_RECEIVED: "bg-rose-600 text-white",
  STATUS_UPDATED: "bg-indigo-600 text-white",
  NOTE_ADDED: "bg-slate-600 text-white",
  DOCUMENT_UPDATED: "bg-cyan-600 text-white",
  DOCUMENT_UPLOADED: "bg-cyan-500 text-white",
  REMINDER_SET: "bg-yellow-600 text-white",
  SCREENING_COMPLETED: "bg-lime-600 text-white",
  TECHNICAL_ASSESSMENT: "bg-orange-600 text-white",
};
