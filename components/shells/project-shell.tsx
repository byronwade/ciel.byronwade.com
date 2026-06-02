import { AppShell } from "@/components/shells/app-shell";

export function ProjectShell({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
