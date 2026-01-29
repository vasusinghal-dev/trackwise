import { ApplicationStats } from "@/src/hooks/useDashboardData";

export default function ConversionRates({
  stats,
}: {
  stats: ApplicationStats;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold text-text-primary mb-4">Conversion Rates</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Applied → Interview</span>
            <span className="font-medium text-text-primary">
              {stats.interviewConversionRate}%
            </span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${stats.interviewConversionRate}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Interview → Offer</span>
            <span className="font-medium text-text-primary">
              {stats.offerConversionRate}%
            </span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${stats.offerConversionRate}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Overall Success</span>
            <span className="font-medium text-text-primary">
              {Math.round((stats.offers / stats.total) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                width: `${Math.round((stats.offers / stats.total) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
