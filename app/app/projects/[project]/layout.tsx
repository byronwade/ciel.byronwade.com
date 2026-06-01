import { Suspense } from "react";
import { ProjectShell } from "@/components/shells/project-shell";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ProjectShell>{children}</ProjectShell>
    </Suspense>
  );
}
