"use client";

import { useApplications } from "@/src/hooks/useApplications";
import ApplicationsHeader from "@/src/components/applications/section/ApplicationsHeader";
import ApplicationsFilters from "@/src/components/applications/section/ApplicationsFilters";
import ApplicationsStats from "@/src/components/applications/section/ApplicationsStats";
import ApplicationsFooter from "@/src/components/applications/section/ApplicationsFooter";
import { useSearchParams } from "next/navigation";
import ApplicationsTable from "@/src/components/applications/section/ApplicationsTable";

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const {
    applications,
    filteredApplications,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
  } = useApplications();

  const displayApplications =
    status === "draft"
      ? filteredApplications.filter((app) => app.status === "DRAFT")
      : filteredApplications;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ApplicationsHeader applications={applications} />

      <ApplicationsFilters
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />

      {status !== "draft" && <ApplicationsStats applications={applications} />}

      <ApplicationsTable applications={displayApplications} search={search} />

      {status !== "draft" && <ApplicationsFooter />}
    </div>
  );
}
