"use client";

import { useRouter } from "next/navigation";
import { AuthCard, CodeInput } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import { setMockSession, createMockSession } from "@/lib/auth/mock-session";

export default function VerifyEmailPage() {
  const router = useRouter();

  const complete = () => {
    setMockSession(createMockSession("user@example.com", "Demo User"));
    router.push("/app/overview?welcome=1");
  };

  return (
    <AuthCard title="Verify your email" description="Enter the 6-digit code sent to your email">
      <CodeInput onComplete={complete} />
      <Button className="w-full mt-4" onClick={complete}>Verify</Button>
    </AuthCard>
  );
}
