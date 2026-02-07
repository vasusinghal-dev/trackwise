import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
  isThisWeek,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";

export function formatMonthYear(date: string | Date) {
  return format(new Date(date), "MMMM yyyy");
}

export const formatDate = (date: Date) => {
  return format(new Date(date), "MMM d, yyyy");
};

export function formatDateHeader(dateString: string) {
  const date = parseISO(dateString);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date)) return format(date, "EEEE");

  return format(date, "MMMM d, yyyy");
}

export function formatLastLogin(date: Date) {
  return formatRelativeDateTime(date);
}

export function formatRelativeTime(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true });
}

export const formatRelativeDate = (date: Date) => {
  const diff = differenceInCalendarDays(date, new Date());

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff < 0) return `${Math.abs(diff)} days ago`;

  return `In ${diff} days`;
};

export const formatRelativeDateTime = (date: Date) => {
  const diff = differenceInCalendarDays(date, new Date());
  const time = format(date, "hh:mm a");

  if (diff === 0) return `Today, ${time}`;
  if (diff === -1) return `Yesterday, ${time}`;
  if (diff === 1) return `Tomorrow, ${time}`;
  if (diff < 0) return `${Math.abs(diff)} days ago`;

  return `In ${diff} days`;
};

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
