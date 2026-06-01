import { Suspense } from "react";
import { DialogHost } from "@/components/dialogs/dialog-host";
import { AppTrustBanner } from "@/components/app/app-trust-banner";
import { KeyboardShortcutsProvider } from "@/components/app/keyboard-shortcuts-provider";

export default function AppRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardShortcutsProvider>
      <AppTrustBanner />
      {children}
      <Suspense fallback={null}>
        <DialogHost />
      </Suspense>
    </KeyboardShortcutsProvider>
  );
}
