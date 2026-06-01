import { Suspense } from "react";
import LogoutPage from "./logout-page";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground text-center">Signing out...</p>}>
      <LogoutPage />
    </Suspense>
  );
}
