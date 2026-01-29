import { Application, Interview, Reminder, Priority } from "@prisma/client";
import { formatRelativeDate } from "../date";

type UpcomingItemBase = {
  id: string;
  title: string;
  subtitle?: string;
  date: Date;
  priority: Priority;
  isToday: boolean;
};

export type UpcomingInterviewItem = UpcomingItemBase & {
  type: "interview";
  link?: string | null;
  interviewer?: string | null;
};

export type UpcomingReminderItem = UpcomingItemBase & {
  type: "reminder";
  reminderType: string;
};

export type UpcomingItem = UpcomingInterviewItem | UpcomingReminderItem;

type AppWithRelations = Application & {
  interviews: Interview[];
  reminders: Reminder[];
};

export function getUpcomingItems(
  applications: AppWithRelations[],
): UpcomingItem[] {
  const interviewItems: UpcomingInterviewItem[] = applications.flatMap((app) =>
    app.interviews
      .filter((interview) => !interview.isCompleted)
      .map((interview) => ({
        id: interview.id,
        type: "interview",
        title: `${app.company} - ${app.role}`,
        subtitle: `Round ${interview.round} • ${interview.type.toLowerCase()} interview`,
        date: interview.scheduledAt,
        priority: app.priority,
        link: interview.meetingLink,
        interviewer: interview.interviewerName,
        isToday: formatRelativeDate(interview.scheduledAt) === "Today",
      })),
  );

  const reminderItems: UpcomingReminderItem[] = applications.flatMap((app) =>
    app.reminders
      .filter((reminder) => !reminder.isCompleted)
      .map((reminder) => ({
        id: reminder.id,
        type: "reminder",
        title: reminder.title,
        subtitle: `${app.company} • ${app.role}`,
        date: reminder.dueDate,
        priority: app.priority,
        reminderType: reminder.type,
        isToday: formatRelativeDate(reminder.dueDate) === "Today",
      })),
  );

  return [...interviewItems, ...reminderItems].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
}
