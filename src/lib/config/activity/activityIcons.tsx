import { ActivityType } from "@prisma/client";
import {
  Calendar,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileText,
  Users,
  Award,
  TrendingUp,
  Send,
  Inbox,
  FileCheck,
  Bell,
  TestTube,
  ThumbsUp,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Define the icon components with proper typing
const iconComponents: Record<ActivityType, LucideIcon> = {
  APPLICATION_SUBMITTED: FileText,
  FOLLOW_UP_SENT: Send,
  FOLLOW_UP_RECEIVED: Inbox,
  INTERVIEW_SCHEDULED: Calendar,
  INTERVIEW_COMPLETED: CheckCircle,
  INTERVIEW_PREPARED: Users,
  OFFER_RECEIVED: Award,
  OFFER_ACCEPTED: ThumbsUp,
  REJECTION_RECEIVED: XCircle,
  STATUS_UPDATED: TrendingUp,
  NOTE_ADDED: MessageSquare,
  DOCUMENT_UPDATED: FileCheck,
  DOCUMENT_UPLOADED: FileText,
  REMINDER_SET: Bell,
  SCREENING_COMPLETED: CheckCircle,
  TECHNICAL_ASSESSMENT: TestTube,
};

export const ACTIVITY_ICONS: Record<ActivityType, React.ReactNode> =
  Object.fromEntries(
    Object.entries(iconComponents).map(([type, Icon]) => [
      type,
      <Icon key={type} className="h-4 w-4" />,
    ]),
  ) as Record<ActivityType, React.ReactNode>;
