"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { workspaceNav } from "@/lib/routes";
import { BudgetMeter } from "@/components/ciel/budget-meter";
import { mockWorkspace } from "@/lib/mock";
import {
  LayoutDashboard,
  FolderKanban,
  Activity,
  BarChart3,
  CreditCard,
  Users,
  Bell,
  Plug,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandPalette, CommandPaletteTrigger } from "@/components/ciel/command-palette";
import { WorkspaceHeaderActions } from "@/components/shells/workspace-header-actions";
import { AppBreadcrumb } from "@/components/shells/app-breadcrumb";
import { WorkspaceSwitcher } from "@/components/shells/workspace-switcher";

const iconMap: Record<string, React.ComponentType> = {
  LayoutDashboard,
  FolderKanban,
  Activity,
  BarChart3,
  CreditCard,
  Users,
  Bell,
  Plug,
  LifeBuoy,
};

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b px-3 py-3">
          <Link href="/app/overview" className="font-semibold text-sm">
            Ciel
          </Link>
          <div className="text-xs text-muted-foreground truncate">{mockWorkspace.name}</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {workspaceNav.map((item) => {
                  const Icon = iconMap[item.icon] ?? LayoutDashboard;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={pathname.startsWith(item.href)}
                        render={
                          <Link href={item.href}>
                            <Icon />
                            <span>{item.label}</span>
                          </Link>
                        }
                      />
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t p-3">
          <BudgetMeter
            used={mockWorkspace.budgetUsed}
            cap={mockWorkspace.budgetCap}
            mode={mockWorkspace.budgetMode}
            compact
          />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <WorkspaceSwitcher />
          <AppBreadcrumb />
          <CommandPaletteTrigger />
          <div className="flex-1" />
          <Button size="sm" render={<Link href="/app/projects/new/source" />}>
            Create Project
          </Button>
          <WorkspaceHeaderActions />
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
      <CommandPalette />
    </SidebarProvider>
  );
}
