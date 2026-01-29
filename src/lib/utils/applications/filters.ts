import { Application } from "@prisma/client";

type Filters = {
  search: string;
  status: string; // "all" | ApplicationStatus
};

export function filterApplications<T extends Application>(
  applications: T[],
  { search, status }: Filters,
): T[] {
  const query = search.trim().toLowerCase();

  return applications.filter((app) => {
    const matchesSearch =
      !query ||
      app.company.toLowerCase().includes(query) ||
      app.role.toLowerCase().includes(query) ||
      (app.location ?? "").toLowerCase().includes(query) ||
      (app.notes ?? "").toLowerCase().includes(query);

    const matchesStatus = status === "all" || app.status === status;

    return matchesSearch && matchesStatus;
  });
}
