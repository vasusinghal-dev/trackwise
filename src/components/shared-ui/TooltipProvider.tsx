type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <div className="relative group inline-flex">
      {children}

      <span
        className="
          pointer-events-none
          absolute top-10 left-1/2 -translate-x-1/2 mb-2
          whitespace-nowrap
          rounded-md bg-black px-2 py-1 text-xs text-white
          opacity-0 scale-95
          transition-all duration-150
          group-hover:opacity-100
          group-hover:scale-100
        "
      >
        {label}
      </span>
    </div>
  );
}
