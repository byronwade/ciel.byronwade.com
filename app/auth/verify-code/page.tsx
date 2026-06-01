"use client";

import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { CodeInput } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const router = useRouter();
  return (
    <SimpleAuthPage title="Enter verification code" description="Paste your 6-digit code below.">
      <CodeInput onComplete={() => router.push("/app/overview")} />
      <Button className="w-full mt-4" onClick={() => router.push("/app/overview")}>Verify</Button>
    </SimpleAuthPage>
  );
}
