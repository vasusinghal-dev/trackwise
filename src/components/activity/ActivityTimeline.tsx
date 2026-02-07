import { useMemo } from "react";
import { format } from "date-fns";
import {
  Calendar,
  ChevronDown,
  Clock,
  Building,
  Briefcase,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { ActivityType } from "@prisma/client";
import { ActivityWithApplication } from "@/src/types/activity";
import { ACTIVITY_ICONS } from "@/src/lib/config/activity/activityIcons";
import { ACTIVITY_COLORS } from "@/src/lib/config/activity/activityColors";
import { ACTIVITY_LABELS } from "@/src/lib/config/activity/activityLabels";
import { STATUS_COLORS } from "@/src/lib/config/activity/activityStatusColors";
import { formatDateHeader, formatRelativeTime } from "@/src/lib/utils/date";

interface TimelineProps {
  activities: ActivityWithApplication[];
  hasMore: boolean;
  loadMore: () => void;
  loadingMore: boolean;
}

export default function ActivityTimeline({
  activities,
  hasMore,
  loadMore,
  loadingMore,
}: TimelineProps) {
  const groupedActivities = useMemo(() => {
    const groups: Record<string, ActivityWithApplication[]> = {};
    activities.forEach((activity) => {
      const dateKey = format(activity.occurredAt, "yyyy-MM-dd");
      (groups[dateKey] ??= []).push(activity);
    });
    return groups;
  }, [activities]);

  const getActivityIcon = (type: ActivityType) =>
    ACTIVITY_ICONS[type] || <MessageSquare className="h-4 w-4" />;

  const isImportantActivity = (type: ActivityType) =>
    [
      "OFFER_RECEIVED",
      "OFFER_ACCEPTED",
      "INTERVIEW_SCHEDULED",
      "INTERVIEW_COMPLETED",
    ].includes(type);

  const getActivityPriority = (type: ActivityType) => {
    switch (type) {
      case "OFFER_RECEIVED":
      case "OFFER_ACCEPTED":
        return {
          label: "High Priority",
          color: "bg-success/15 text-success",
          icon: TrendingUp,
        };
      case "INTERVIEW_SCHEDULED":
        return {
          label: "Upcoming",
          color: "bg-warning/15 text-warning",
          icon: AlertCircle,
        };
      case "REJECTION_RECEIVED":
        return {
          label: "Closed",
          color: "bg-surface border border-border text-text-secondary",
          icon: XCircle,
        };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10">
      {Object.entries(groupedActivities).map(([dateKey, dateActivities]) => (
        <div key={dateKey}>
          {/* Date Header */}
          <div className="sticky top-20 z-10 mb-8">
            <div className="inline-flex items-center gap-4 rounded-xl bg-surface border border-border px-5 py-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-lg text-text-primary">
                  {formatDateHeader(dateKey)}
                </div>
                <div className="text-sm text-text-secondary">
                  {dateActivities.length} activit
                  {dateActivities.length === 1 ? "y" : "ies"} •{" "}
                  {format(dateActivities[0].occurredAt, "EEEE")}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-10">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

            {dateActivities.map((activity) => {
              const priority = getActivityPriority(activity.type);
              const isImportant = isImportantActivity(activity.type);

              return (
                <div key={activity.id} className="relative mb-8">
                  {/* Dot */}
                  <div className="absolute left-0 -translate-x-1/2">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center border border-background shadow-sm ${
                        ACTIVITY_COLORS[activity.type].split(" ")[0]
                      } ${
                        isImportant
                          ? "ring-2 ring-primary/30"
                          : "ring-1 ring-border"
                      }`}
                    >
                      <span className="text-white">
                        {getActivityIcon(activity.type)}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="ml-12 rounded-xl border border-border bg-surface p-5 hover:border-primary/30 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${ACTIVITY_COLORS[activity.type]}`}
                      >
                        {ACTIVITY_LABELS[activity.type]}
                      </span>

                      {priority && (
                        <span
                          className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 ${priority.color}`}
                        >
                          <priority.icon className="h-3 w-3" />
                          {priority.label}
                        </span>
                      )}

                      <span className="text-xs text-text-secondary">
                        {formatRelativeTime(activity.occurredAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {activity.title}
                    </h3>

                    {activity.description && (
                      <p className="text-text-secondary mb-4">
                        {activity.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-text-secondary" />
                          <span className="font-medium">
                            {activity.application.company}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-text-secondary" />
                          <span className="font-medium">
                            {activity.application.role}
                          </span>
                        </div>

                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_COLORS[activity.application.status]}`}
                        >
                          {activity.application.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Clock className="h-4 w-4" />
                        {format(activity.occurredAt, "h:mm a")}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="pt-10 text-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium hover:border-primary/50 transition-colors disabled:opacity-60"
          >
            {loadingMore ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Loading…
              </>
            ) : (
              <>
                Load more
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
