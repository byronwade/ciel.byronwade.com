import { AuthCard } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset your password" description="Enter your email and we'll send reset instructions">
      <p className="text-sm text-muted-foreground mb-4">
        If an account exists for this email, you will receive reset instructions shortly.
      </p>
      <Button className="w-full" asChild>
        <Link href="/auth/check-email">Send reset link</Link>
      </Button>
    </AuthCard>
  );
}
