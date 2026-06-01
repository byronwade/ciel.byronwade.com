import { SubNav } from "@/components/shells/sub-nav";
import { teamNav } from "@/lib/routes";

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SubNav items={teamNav} />
      {children}
    </div>
  );
}
