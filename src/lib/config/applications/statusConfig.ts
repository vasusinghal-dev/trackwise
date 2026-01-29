import { ApplicationStatus } from "@prisma/client";
import {
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  LucideIcon,
  Phone,
  Users,
  Video,
  XCircle,
} from "lucide-react";

export const statusConfig: Record<
  ApplicationStatus,
  {
    label: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    borderColor: string;
  }
> = {
  DRAFT: {
    label: "Draft",
    icon: FileText,
    color: "text-gray-600",
    bg: "bg-gray-100",
    borderColor: "border-gray-200",
  },
  APPLIED: {
    label: "Applied",
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100",
    borderColor: "border-blue-200",
  },
  SCREENING: {
    label: "Screening",
    icon: Phone,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    borderColor: "border-yellow-200",
  },
  INTERVIEWING: {
    label: "Interviewing",
    icon: Video,
    color: "text-purple-600",
    bg: "bg-purple-100",
    borderColor: "border-purple-200",
  },
  TECHNICAL: {
    label: "Technical",
    icon: Briefcase,
    color: "text-orange-600",
    bg: "bg-orange-100",
    borderColor: "border-orange-200",
  },
  FINAL_ROUND: {
    label: "Final Round",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    borderColor: "border-indigo-200",
  },
  OFFER: {
    label: "Offer",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    borderColor: "border-green-200",
  },
  NEGOTIATING: {
    label: "Negotiating",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    borderColor: "border-emerald-200",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle,
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    borderColor: "border-emerald-300",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    borderColor: "border-red-200",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    icon: XCircle,
    color: "text-gray-600",
    bg: "bg-gray-100",
    borderColor: "border-gray-300",
  },
  GHOSTED: {
    label: "Ghosted",
    icon: Clock,
    color: "text-gray-500",
    bg: "bg-gray-100",
    borderColor: "border-gray-200",
  },
};
