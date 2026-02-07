// /src/components/application-view/RemindersList.tsx
import { Reminder } from "@prisma/client";
import { formatDate, formatRelativeDate } from "@/src/lib/utils/date";
import { Bell, CheckCircle, Clock } from "lucide-react";

interface RemindersListProps {
  reminders: Reminder[];
  applicationId: string;
}

export default function RemindersList({ reminders }: RemindersListProps) {
  const upcomingReminders = reminders.filter(
    (r) => new Date(r.dueDate) > new Date() && !r.completedAt,
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Reminders
      </h2>

      <div className="space-y-3">
        {upcomingReminders.length > 0 ? (
          upcomingReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="p-3 border border-border rounded-lg hover:bg-background/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-text-primary">
                      {reminder.title}
                    </h3>
                  </div>
                  {reminder.description && (
                    <p className="text-sm text-text-secondary mb-2">
                      {reminder.description}
                    </p>
                  )}
                </div>
                <button className="p-1.5 hover:bg-success/10 rounded transition-colors">
                  <CheckCircle className="w-4 h-4 text-success" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-secondary mt-2">
                <Clock className="w-3 h-3" />
                <span>Due {formatRelativeDate(reminder.dueDate)}</span>
                <span className="mx-1">•</span>
                <span>{formatDate(reminder.dueDate)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-text-secondary" />
            </div>
            <p className="text-text-secondary mb-2">No upcoming reminders</p>
            <p className="text-text-secondary text-sm">
              Set reminders for follow-ups or next steps
            </p>
          </div>
        )}
      </div>

      {upcomingReminders.length > 0 && (
        <button className="w-full mt-4 px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors text-sm font-medium text-text-primary">
          View All Reminders ({reminders.length})
        </button>
      )}
    </div>
  );
}
