import { statusConfig } from "@/src/lib/config/applications/statusConfig";
import { ApplicationStatus } from "@prisma/client";
import { Filter, Search } from "lucide-react";

export default function ApplicationsFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ApplicationStatus | "all") => void;
}) {
  function handleStatusChange(value: string) {
    if (value === "all") return onStatusChange("all");
    onStatusChange(value as ApplicationStatus);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search by company, role, location, or notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        >
          <option value="all">All Status</option>
          {Object.entries(statusConfig).map(([value, config]) => (
            <option key={value} value={value}>
              {config.label}
            </option>
          ))}
        </select>

        <button className="px-4 py-3 border border-border rounded-lg hover:bg-surface transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>
    </div>
  );
}
