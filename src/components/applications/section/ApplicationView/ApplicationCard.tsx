import { PriorityBadge } from "@/src/components/shared-ui/badges/PriorityBadge";
import { StatusBadge } from "@/src/components/shared-ui/badges/StatusBadge";
import { getNextAction } from "@/src/lib/utils/applications/nextAction";
import { formatDate, formatRelativeDate } from "@/src/lib/utils/date";
import { Application, ApplicationDocument, Interview } from "@prisma/client";
import {
  Building,
  Clock,
  DollarSign,
  Edit,
  Eye,
  FileText,
  MapPin,
  Video,
} from "lucide-react";
import { WorkModeBadge } from "../../ui/WorkModeBadge";
import { SourceBadge } from "../../ui/SourceBadge";

export default function ApplicationCard({
  application,
}: {
  application: Application & {
    interviews: Interview[];
    documents: ApplicationDocument[];
  };
}) {
  const nextAction = getNextAction(application);
  const interviewCount = application?.interviews?.length || 0;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">
              {application.company}
            </h3>
            <p className="text-sm text-text-secondary">{application.role}</p>
          </div>
        </div>
        <PriorityBadge priority={application.priority} />
      </div>

      {/* Status & Details */}
      <div className="space-y-3 mb-4">
        <StatusBadge status={application.status} stage={application.stage} />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-text-secondary" />
            <span>{application.location}</span>
          </div>
          <WorkModeBadge mode={application.workMode} />
        </div>

        {application.salaryMin && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-3.5 h-3.5 text-text-secondary" />
            <span>
              ${application.salaryMin / 1000}k
              {application.salaryMax
                ? ` - $${application.salaryMax / 1000}k`
                : "+"}
            </span>
          </div>
        )}

        {application.source && (
          <div className="text-sm">
            <span className="text-text-secondary">Source: </span>
            <SourceBadge source={application.source} />
          </div>
        )}

        <div className="text-sm text-text-secondary">
          Applied {formatDate(application.appliedDate)}
        </div>
      </div>

      {/* Next Action */}
      {nextAction && (
        <div className="mb-4 p-3 bg-background rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-sm font-medium">{nextAction.label}</span>
            </div>
            <span className="text-sm text-text-primary">
              {formatRelativeDate(nextAction.date)}
            </span>
          </div>
        </div>
      )}

      {/* Notes Preview */}
      {application.notes && (
        <div className="mb-4 p-3 bg-background/50 rounded-lg">
          <p className="text-sm text-text-secondary line-clamp-2">
            {application.notes}
          </p>
        </div>
      )}

      {/* Actions & Metrics */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          {interviewCount > 0 && (
            <span className="text-xs text-text-secondary flex items-center gap-1">
              <Video className="w-3 h-3" /> {interviewCount} interview
              {interviewCount !== 1 ? "s" : ""}
            </span>
          )}
          {application.documents && application.documents.length > 0 && (
            <span className="text-xs text-text-secondary flex items-center gap-1">
              <FileText className="w-3 h-3" /> {application.documents.length}{" "}
              doc
              {application.documents.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-text-primary">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-background rounded-lg transition-colors text-text-secondary hover:text-text-primary">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
