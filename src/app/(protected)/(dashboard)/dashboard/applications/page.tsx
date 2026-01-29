"use client";

import { useState } from "react";
import { useApplications } from "@/src/hooks/useApplications";
import ApplicationsHeader from "@/src/components/applications/section/ApplicationsHeader";
import ApplicationsFilters from "@/src/components/applications/section/ApplicationsFilters";
import ApplicationsStats from "@/src/components/applications/section/ApplicationsStats";
import ApplicationsTable from "@/src/components/applications/section/ApplicationView/ApplicationsTable";
import ApplicationCard from "@/src/components/applications/section/ApplicationView/ApplicationCard";
import ApplicationsFooter from "@/src/components/applications/section/ApplicationsFooter";
import { useSearchParams } from "next/navigation";

export default function ApplicationsPage() {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
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

  const whatToName =
    status === "draft"
      ? filteredApplications.filter((app) => app.status === "DRAFT")
      : filteredApplications;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ApplicationsHeader
        applications={applications}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      <ApplicationsFilters
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />
      {status !== "draft" && <ApplicationsStats applications={applications} />}
      {viewMode === "table" ? (
        <ApplicationsTable applications={whatToName} search={search} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatToName.map((app) => {
            return <ApplicationCard key={app.id} application={app} />;
          })}
        </div>
      )}
      {status !== "draft" && <ApplicationsFooter />}
    </div>
  );
}
