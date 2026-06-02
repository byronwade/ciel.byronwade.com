"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projectNav } from "@/lib/routes";
import { StatusPill, BudgetMeter, CommandPalette } from "@/components/ciel";
import { getProject, mockProjects } from "@/lib/mock";
import { AppBreadcrumb } from "@/components/shells/app-breadcrumb";
import { WorkspaceHeaderActions } from "@/components/shells/workspace-header-actions";
import {
  LayoutDashboard,
  Rocket,
  Eye,
  GitBranch,
  ScrollText,
  BarChart3,
  Globe,
  Variable,
  Hammer,
  Shield,
  Wallet,
  Activity,
  Settings,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Project } from "@/types";

const iconMap: Record<string, React.ComponentType> = {
  LayoutDashboard,
  Rocket,
  Eye,
  GitBranch,
  ScrollText,
  BarChart3,
  Globe,
  Variable,
  Hammer,
  Shield,
  Wallet,
  Activity,
  Settings,
};

export function ProjectShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const projectId = params.project as string;
  const [project, setProject] = useState<Project | undefined>();

  useEffect(() => {
    getProject(projectId).then(setProject);
  }, [projectId]);

  const nav = projectNav(projectId);
  const p = project ?? mockProjects[0];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b px-3 py-3">
          <Link href="/app/projects" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3" />
            Projects
          </Link>
          <div className="font-semibold text-sm truncate">{p.name}</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => {
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
        <SidebarFooter className="border-t p-3 flex flex-col gap-2">
          <StatusPill status={p.status} />
          <BudgetMeter used={p.budgetUsed} cap={p.budgetCap} mode={p.budgetMode} compact />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="gap-1">
                  Production
                  <ChevronDown className="size-3 opacity-50" />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuItem render={<Link href={`/app/projects/${projectId}/environment/production`} />}>Production</DropdownMenuItem>
              <DropdownMenuItem render={<Link href={`/app/projects/${projectId}/environment/preview`} />}>Preview</DropdownMenuItem>
              <DropdownMenuItem render={<Link href={`/app/projects/${projectId}/environment/staging`} />}>Staging</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden sm:flex">
            <StatusPill status={p.status} label={p.branch} />
          </div>
          <div className="hidden min-w-0 items-center lg:flex">
            <AppBreadcrumb />
          </div>
          <div className="flex-1" />
          <Button size="sm" variant="outline" className="hidden sm:inline-flex" render={<Link href={`/app/projects/${projectId}/previews?dialog=share-preview`} />}>
            Share Preview
          </Button>
          <Button size="sm" render={<Link href={`${pathname}?dialog=deploy-now`} />}>
            Deploy
          </Button>
          <WorkspaceHeaderActions />
        </header>
        <main id="main-content" tabIndex={-1} className="flex-1 p-4 outline-none md:p-6">{children}</main>
      </SidebarInset>
      <CommandPalette projectId={projectId} />
    </SidebarProvider>
  );
}
