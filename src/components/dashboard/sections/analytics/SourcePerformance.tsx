import { Application } from "@prisma/client";

export default function SourcePerformance({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold text-text-primary mb-4">
        Source Performance
      </h3>
      <div className="space-y-3">
        {Object.entries(
          applications.reduce(
            (acc, app) => {
              const source = app.source || "OTHER";
              if (!acc[source]) acc[source] = { total: 0, interviews: 0 };
              acc[source].total++;
              if (
                [
                  "INTERVIEWING",
                  "TECHNICAL",
                  "FINAL_ROUND",
                  "OFFER",
                  "NEGOTIATING",
                  "ACCEPTED",
                ].includes(app.status)
              ) {
                acc[source].interviews++;
              }
              return acc;
            },
            {} as Record<string, { total: number; interviews: number }>,
          ),
        ).map(([source, data]) => (
          <div key={source} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-primary">
                {source.replace("_", " ")}
              </span>
              <span className="text-xs text-text-secondary">
                ({data.total})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                {data.total > 0
                  ? Math.round((data.interviews / data.total) * 100)
                  : 0}
                %
              </span>
              <div className="w-20 h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${data.total > 0 ? Math.round((data.interviews / data.total) * 100) : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
