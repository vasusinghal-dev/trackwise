import { useEffect, useState, useMemo } from "react";
import { getApplications } from "@/src/lib/actions/application.actions";
import {
  Activity,
  Application,
  ApplicationDocument,
  ApplicationStatus,
  Interview,
  Reminder,
} from "@prisma/client";

export function useApplications() {
  const [applications, setApplications] = useState<
    (Application & {
      interviews: Interview[];
      reminders: Reminder[];
      activities: Activity[];
      documents: ApplicationDocument[];
    })[]
  >([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all",
  );

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.role.toLowerCase().includes(search.toLowerCase()) ||
        (app.location ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (app.notes ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  return {
    applications,
    filteredApplications,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
  };
}
