import { redirect } from "next/navigation";
import { getUserActivities } from "@/src/lib/actions/activity.actions";
import ActivityLog from "@/src/components/activity/ActivityLog";
import { auth } from "@/src/lib/auth/auth";
import { headers } from "next/headers";

export default async function ActivitiesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const initialData = await getUserActivities(session.user.id, {
    page: 1,
    limit: 20,
  });

  return (
    <ActivityLog
      userId={session.user.id}
      initialActivities={initialData.activities}
      initialTotal={initialData.total}
    />
  );
}
