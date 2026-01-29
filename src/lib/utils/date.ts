export function monthYearFormat(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatLastLogin(date: Date) {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfToday) {
    return `Today, ${date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  if (date >= startOfYesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatRelativeDate = (date: Date) => {
  const DAY = 1000 * 60 * 60 * 24;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getTime() - today.getTime()) / DAY);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
  return `In ${diffDays} days`;
};

export const formatRelativeDateTime = (date: Date) => {
  const DAY = 1000 * 60 * 60 * 24;

  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  const targetDay = new Date(target);
  targetDay.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((targetDay.getTime() - today.getTime()) / DAY);

  const time = target.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) return `Today, ${time}`;
  if (diffDays === -1) return `Yesterday, ${time}`;
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
  if (diffDays === 1) return `Tomorrow, ${time}`;

  return `In ${diffDays} days`;
};
