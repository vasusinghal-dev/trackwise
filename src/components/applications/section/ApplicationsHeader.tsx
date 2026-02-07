import { Application } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplicationsHeader({
  applications,
}: {
  applications: Application[];
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
