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
      <main
        id="main-content"
        tabIndex={-1}
        className="relative flex flex-1 items-center justify-center overflow-hidden p-4 outline-none"
      >
        <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="glow-brand pointer-events-none absolute inset-x-0 top-0 -z-10 h-72" />
        <div className="w-full max-w-md">{children}</div>
      </main>
    </>
  );
}
