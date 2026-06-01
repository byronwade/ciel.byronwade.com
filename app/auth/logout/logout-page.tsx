"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clearMockSession } from "@/lib/auth/mock-session";

export default function LogoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    clearMockSession();
    router.replace("/auth/login");
  }, [router, searchParams]);

  return null;
}
