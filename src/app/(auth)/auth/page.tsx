import AuthClient from "@/src/components/auth-page/AuthClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthClient />
    </Suspense>
  );
}
