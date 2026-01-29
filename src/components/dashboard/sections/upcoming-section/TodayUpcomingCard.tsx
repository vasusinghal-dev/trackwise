import { UpcomingItem } from "@/src/lib/utils/dashboard/upcoming";
import { Clock, ExternalLink, Mail, Phone, Users, Video } from "lucide-react";
import { PriorityBadge } from "../../../shared-ui/badges/PriorityBadge";
import { formatRelativeDateTime } from "@/src/lib/utils/date";

export default function TodayUpcomingCard({ item }: { item: UpcomingItem }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {item.type === "interview" ? (
              <Video className="w-5 h-5 text-blue-500" />
            ) : (
              <Mail className="w-5 h-5 text-green-500" />
            )}
            <h3 className="font-bold text-lg text-text-primary">
              {item.title}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-lg ${item.type === "interview" ? "bg-blue-500" : "bg-green-500"} flex items-center justify-center`}
              >
                {item.type === "interview" ? (
                  <Phone className="w-4 h-4 text-white" />
                ) : (
                  <Mail className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="font-medium">
                {item.type === "interview" ? "Interview" : "Follow-up"}
              </span>
            </div>
            {item.subtitle && (
              <span className="text-sm text-text-secondary">
                {item.subtitle}
              </span>
            )}
          </div>
        </div>
        <PriorityBadge priority={item.priority} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              {formatRelativeDateTime(item.date)}
            </span>
          </div>
          {item.type === "interview" && item.interviewer && (
            <div className="flex items-center gap-2 text-text-secondary">
              <Users className="w-4 h-4" />
              <span>{item.interviewer}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {item.type === "interview" && item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium flex items-center gap-2"
            >
              Join <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <button className="px-3 py-1.5 border border-border rounded-lg hover:bg-background transition-colors text-sm font-medium">
            Mark Done
          </button>
        </div>
      </div>
    </div>
  );
}
