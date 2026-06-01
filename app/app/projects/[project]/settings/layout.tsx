import { SubNav } from "@/components/shells/sub-nav";
import { projectSettingsNav } from "@/lib/routes";

export default async function ProjectSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  return (
    <div>
      <SubNav items={projectSettingsNav(project)} />
      {children}
    </div>
  );
}
