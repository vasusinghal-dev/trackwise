// /src/components/shared-ui/badges/SourceBadge.tsx
interface SourceBadgeProps {
  source: string | null;
}

export const SourceBadge = ({ source }: SourceBadgeProps) => {
  if (!source) return null;

  // Define common job sources and their styles
  const sourceConfig: Record<
    string,
    { bg: string; color: string; label: string }
  > = {
    LinkedIn: {
      bg: "bg-[#0077B5]/10",
      color: "text-[#0077B5]",
      label: "LinkedIn",
    },
    Indeed: {
      bg: "bg-[#2164F3]/10",
      color: "text-[#2164F3]",
      label: "Indeed",
    },
    Glassdoor: {
      bg: "bg-[#0CAA41]/10",
      color: "text-[#0CAA41]",
      label: "Glassdoor",
    },
    "Company Website": {
      bg: "bg-primary/10",
      color: "text-primary",
      label: "Company Site",
    },
    Referral: {
      bg: "bg-success/10",
      color: "text-success",
      label: "Referral",
    },
    Recruiter: {
      bg: "bg-secondary/10",
      color: "text-secondary",
      label: "Recruiter",
    },
    "Career Fair": {
      bg: "bg-warning/10",
      color: "text-warning",
      label: "Career Fair",
    },
    Other: {
      bg: "bg-gray-100",
      color: "text-gray-700",
      label: "Other",
    },
  };

  // Get config for the source or use default
  const config = sourceConfig[source] || {
    bg: "bg-background",
    color: "text-text-secondary",
    label: source,
  };

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium border ${config.bg} ${config.color} border-border`}
    >
      {config.label}
    </span>
  );
};
