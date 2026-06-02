import { AppShell } from "@/components/shells/app-shell";

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
