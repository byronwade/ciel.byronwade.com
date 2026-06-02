import type { Metadata } from "next";
import { AuthHeader } from "@/components/shells/auth-header";

export const metadata: Metadata = {
  title: { default: "Sign in", template: "%s · Ciel" },
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 items-center justify-center p-4 outline-none">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </>
  );
}
