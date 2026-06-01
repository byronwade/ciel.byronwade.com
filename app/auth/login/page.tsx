import { Suspense } from "react";
import { LoginForm } from "@/components/auth/auth-forms";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <LoginForm />
    </Suspense>
  );
}
