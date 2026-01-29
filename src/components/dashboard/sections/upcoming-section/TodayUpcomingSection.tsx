import { UpcomingItem } from "@/src/lib/utils/dashboard/upcoming";
import { Calendar } from "lucide-react";
import TodayUpcomingCard from "./TodayUpcomingCard";

type Tab = "today" | "upcoming";

export default function TodayUpcomingSection({
  activeTab,
  onTabChange,
  items,
}: {
  activeTab: Tab;
  onTabChange: (value: Tab) => void;
  items: UpcomingItem[];
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Today / Upcoming
        </h2>
        <div className="flex border border-border rounded-lg p-1">
          <button
            onClick={() => onTabChange("today")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "today" ? "bg-primary text-white" : "text-text-secondary hover:bg-surface"}`}
          >
            Today
          </button>
          <button
            onClick={() => onTabChange("upcoming")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "upcoming" ? "bg-primary text-white" : "text-text-secondary hover:bg-surface"}`}
          >
            Upcoming
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.length > 0 ? (
          items.map((item) => <TodayUpcomingCard key={item.id} item={item} />)
        ) : (
          <div className="col-span-2 text-center py-12 border-2 border-dashed border-border rounded-xl">
            <Calendar className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {activeTab === "today"
                ? "No items scheduled for today"
                : "No upcoming items"}
            </h3>
            <p className="text-text-secondary">
              You&apos;re all caught up for now!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
