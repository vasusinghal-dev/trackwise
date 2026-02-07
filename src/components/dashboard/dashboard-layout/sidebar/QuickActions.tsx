import { FiBell, FiClock, FiPlusCircle } from "react-icons/fi";

const quickActions = [
  {
    name: "Add Application",
    icon: FiPlusCircle,
    action: () => console.log("Add app"),
  },
  {
    name: "Schedule Interview",
    icon: FiClock,
    action: () => console.log("Schedule"),
  },
  {
    name: "Set Reminder",
    icon: FiBell,
    action: () => console.log("Reminder"),
  },
];

export default function QuickActions() {
  return (
    <div className="p-4 border-b border-border">
      <h3 className="text-xs font-semibold text-text-secondary/60 uppercase tracking-wider mb-3">
        Quick Actions
      </h3>
      <div className="space-y-2">
        {quickActions.map((action) => (
          <button
            key={action.name}
            onClick={action.action}
            className="flex items-center w-full px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface/80 transition-all duration-200"
          >
            <action.icon className="w-4 h-4 mr-3 opacity-70" />
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
}
