import { sourceConfig } from "@/src/lib/config/applications/sourceConfig";
import { Source } from "@prisma/client";

export const SourceBadge = ({ source }: { source?: Source }) => {
  if (!source) return null;

  const config = sourceConfig[source];
  return (
    <span className={`text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};
