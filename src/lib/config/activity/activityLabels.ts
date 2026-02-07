import { ActivityType } from "@prisma/client";

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  APPLICATION_SUBMITTED: "Application Submitted",
  FOLLOW_UP_SENT: "Follow-up Sent",
  FOLLOW_UP_RECEIVED: "Follow-up Received",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  INTERVIEW_COMPLETED: "Interview Completed",
  INTERVIEW_PREPARED: "Interview Prepared",
  OFFER_RECEIVED: "Offer Received",
  OFFER_ACCEPTED: "Offer Accepted",
  REJECTION_RECEIVED: "Rejection Received",
  STATUS_UPDATED: "Status Updated",
  NOTE_ADDED: "Note Added",
  DOCUMENT_UPDATED: "Document Updated",
  DOCUMENT_UPLOADED: "Document Uploaded",
  REMINDER_SET: "Reminder Set",
  SCREENING_COMPLETED: "Screening Completed",
  TECHNICAL_ASSESSMENT: "Technical Assessment",
};
