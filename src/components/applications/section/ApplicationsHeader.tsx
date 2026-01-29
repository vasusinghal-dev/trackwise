import { Application } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type viewTab = "table" | "card";

export default function ApplicationsHeader({
  applications,
  viewMode,
  onViewChange,
}: {
  applications: Application[];
  viewMode: viewTab;
  onViewChange: (value: viewTab) => void;
}) {
  const activeApplications = applications.filter((app) => !app.isArchived);
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Applications</h1>
        <p className="text-text-secondary mt-1">
          {activeApplications.length} active •{" "}
          {applications.filter((a) => a.status === "INTERVIEWING").length} in
          interviews • {applications.filter((a) => a.status === "OFFER").length}{" "}
          offers
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange("table")}
            className={`px-3 py-2 text-sm font-medium ${viewMode === "table" ? "bg-primary text-white" : "text-text-secondary hover:bg-surface"}`}
          >
            Table
          </button>
          <button
            onClick={() => onViewChange("card")}
            className={`px-3 py-2 text-sm font-medium ${viewMode === "card" ? "bg-primary text-white" : "text-text-secondary hover:bg-surface"}`}
          >
            Cards
          </button>
        </div>
        <button
          onClick={() => router.push("/dashboard/applications/new")}
          className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Application
        </button>
      </div>
    </div>
  );
}
