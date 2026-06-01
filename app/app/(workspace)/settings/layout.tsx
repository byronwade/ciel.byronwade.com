import { SubNav } from "@/components/shells/sub-nav";
import { settingsNav } from "@/lib/routes";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SubNav items={settingsNav} />
      {children}
    </div>
  );
}
