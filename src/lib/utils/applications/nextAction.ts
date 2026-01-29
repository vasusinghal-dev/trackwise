import { Application, Interview } from "@prisma/client";

export type NextAction =
  | {
      type: "follow-up";
      label: "Follow up";
      date: Date;
    }
  | {
      type: "interview";
      label: "Interview";
      date: Date;
      interview: Interview;
    };

export function getNextAction(
  app: Application & { interviews?: Interview[] },
): NextAction | null {
  const now = new Date();

  // Follow-up always wins
  if (app.nextFollowUp && app.nextFollowUp > now) {
    return {
      type: "follow-up",
      label: "Follow up",
      date: app.nextFollowUp,
    };
  }

  // Next upcoming interview
  const upcomingInterview = app.interviews
    ?.filter((i) => i.scheduledAt > now && !i.isCompleted)
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())[0];

  if (upcomingInterview) {
    return {
      type: "interview",
      label: "Interview",
      date: upcomingInterview.scheduledAt,
      interview: upcomingInterview,
    };
  }

  return null;
}
