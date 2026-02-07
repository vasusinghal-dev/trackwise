import { Filter, Plus, RefreshCw, Search, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  searchQuery: string;
  filtersCount: number;
  onSearch: (query: string) => void;
  onToggleFilters: () => void;
  onRefresh: () => void;
  loading: boolean;
};

export default function ActivityHeader({
  searchQuery,
  filtersCount,
  onSearch,
  onToggleFilters,
  onRefresh,
  loading,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">
              Activity Log
            </h1>
            <p className="mt-1 text-text-secondary">
              Track all your job application activities in one place
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard/applications/new")}
                className="px-4 py-2.5 bg-surface text-white rounded-lg hover:bg-primary-hover transition-colors font-medium flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Application
              </button>
            </div>

            <button
              onClick={onRefresh}
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-surface text-text-secondary hover:border-primary/50 hover:bg-primary-hover transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading && "animate-spin"}`} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search activities by title, description, company, or role…"
              className="w-full rounded-xl border border-border bg-surface
                         py-3 pl-10 pr-10 text-sm
                         text-text-primary
                         placeholder:text-text-secondary
                         focus:border-primary focus:outline-none
                         focus:ring-2 focus:ring-primary/20
                         transition-all"
            />

            {searchQuery && (
              <button
                onClick={() => onSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-text-secondary hover:text-text-primary
                           transition-colors"
                aria-label="Clear search"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
          <button
            onClick={onToggleFilters}
            className="group inline-flex items-center gap-2 px-3 py-2
                         rounded-lg border border-border bg-surface
                         text-sm text-text-secondary
                         hover:border-primary/50 hover:text-primary
                         transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters
            {filtersCount > 0 && (
              <span
                className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center
                             rounded-full bg-primary text-xs font-medium text-white px-1"
              >
                {filtersCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
