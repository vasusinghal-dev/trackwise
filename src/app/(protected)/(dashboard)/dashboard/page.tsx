"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useDashboardData } from "@/src/hooks/useDashboardData";
import StatsOverview from "@/src/components/dashboard/sections/StatsOverview";
import TodayUpcomingSection from "@/src/components/dashboard/sections/upcoming-section/TodayUpcomingSection";
import PipelineSnapshot from "@/src/components/dashboard/sections/PipelineSnapshot";
import ConversionRates from "@/src/components/dashboard/sections/analytics/ConversionRates";
import SourcePerformance from "@/src/components/dashboard/sections/analytics/SourcePerformance";
import NeedsAttention from "@/src/components/dashboard/sections/NeedsAttention";
import RecentActivity from "@/src/components/dashboard/sections/RecentActivity";
import { toast } from "sonner";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming">("today");
  const { applications, stats, upcomingItems, pipeline, staleApplications } =
    useDashboardData(activeTab);

  if (!applications || !stats) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-2">
            Your job search at a glance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.info("Coming Soon...")}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => toast.info("Coming Soon...")}
            className="px-4 py-2 border border-border rounded-lg hover:bg-surface transition-colors font-medium"
          >
            Quick Report
          </button>
        </div>
      </div>

      <StatsOverview stats={stats} applications={applications} />

      <TodayUpcomingSection
        activeTab={activeTab}
        onTabChange={setActiveTab}
        items={upcomingItems}
      />

      <PipelineSnapshot pipeline={pipeline} />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionRates stats={stats} />
        <SourcePerformance applications={applications} />
      </section>

      <NeedsAttention applications={staleApplications} />

      <RecentActivity applications={applications} />
    </div>
  );
}
