import { Application } from "@prisma/client";

export type PipelineData = {
  applied: Application[];
  interviewing: Application[];
  offer: Application[];
  rejected: Application[];
};

export const getPipelineData = (
  mockApplications: Application[],
): PipelineData => {
  return {
    applied: mockApplications.filter((app) =>
      ["APPLIED", "SCREENING"].includes(app.status),
    ),
    interviewing: mockApplications.filter((app) =>
      ["INTERVIEWING", "TECHNICAL", "FINAL_ROUND"].includes(app.status),
    ),
    offer: mockApplications.filter((app) =>
      ["OFFER", "NEGOTIATING", "ACCEPTED"].includes(app.status),
    ),
    rejected: mockApplications.filter((app) =>
      ["REJECTED", "WITHDRAWN", "GHOSTED"].includes(app.status),
    ),
  };
};

export const getStaleApplications = (
  mockApplications: Application[],
): Application[] => {
  const staleThreshold = new Date();
  staleThreshold.setDate(staleThreshold.getDate() - 10); // 10 days

  return mockApplications.filter((app) => {
    if (["REJECTED", "ACCEPTED", "WITHDRAWN"].includes(app.status))
      return false;

    const lastUpdate = new Date(app.statusUpdatedAt);
    return lastUpdate < staleThreshold;
  });
};
