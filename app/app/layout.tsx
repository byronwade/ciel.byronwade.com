import type { Metadata } from "next";
import { Suspense } from "react";
import { DialogHost } from "@/components/dialogs/dialog-host";
import { KeyboardShortcutsProvider } from "@/components/app/keyboard-shortcuts-provider";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Ciel" },
  robots: { index: false, follow: false },
};

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardShortcutsProvider>
      {children}
      <Suspense fallback={null}>
        <DialogHost />
      </Suspense>
    </KeyboardShortcutsProvider>
  );
}
