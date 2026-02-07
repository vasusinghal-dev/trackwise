import { DashboardShell } from "@/src/components/dashboard/dashboard-layout/layout/DashboardShell";
import { SidebarProvider } from "@/src/contexts/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
