// /src/components/application-view/ActivityTimeline.tsx
import { Activity } from "@prisma/client";
import { formatDate, formatRelativeDate } from "@/src/lib/utils/date";
import {
  CheckCircle,
  FileText,
  MessageSquare,
  Phone,
  UserPlus,
} from "lucide-react";

interface ActivityTimelineProps {
  activities: Activity[];
}

export default function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "INTERVIEW":
        return <Phone className="w-4 h-4" />;
      case "APPLICATION_SUBMITTED":
        return <CheckCircle className="w-4 h-4" />;
      case "EMAIL":
        return <MessageSquare className="w-4 h-4" />;
      case "DOCUMENT_UPLOADED":
        return <FileText className="w-4 h-4" />;
      case "CONTACT_ADDED":
        return <UserPlus className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6">
        Activity Timeline
      </h2>
      <div className="space-y-6">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={activity.id} className="relative pl-8">
              {/* Timeline line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-border" />
              )}

              {/* Icon */}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-4 h-4 text-primary">
                  {getActivityIcon(activity.type)}
                </div>
              </div>

              {/* Content */}
              <div className="pb-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-text-primary">
                    {activity.title}
                  </h3>
                  <span className="text-sm text-text-secondary">
                    {formatRelativeDate(activity.occurredAt)}
                  </span>
                </div>
                {activity.description && (
                  <p className="text-text-secondary text-sm mb-2">
                    {activity.description}
                  </p>
                )}
                <div className="text-xs text-text-secondary">
                  {formatDate(activity.occurredAt)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-text-secondary" />
            </div>
            <p className="text-text-secondary">No activity recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
