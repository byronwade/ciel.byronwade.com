"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { workspaceNav, projectNav, docsNav, authRoutes } from "@/lib/routes";
import { mockProjects } from "@/lib/mock";

interface CommandPaletteProps {
  projectId?: string;
}

export function CommandPalette({ projectId }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const nav = projectId ? projectNav(projectId) : workspaceNav;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to page or action..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {nav.map((item) => (
            <CommandItem key={item.href} onSelect={() => navigate(item.href)}>
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        {!projectId && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {mockProjects.map((p) => (
                <CommandItem key={p.id} onSelect={() => navigate(`/app/projects/${p.id}/overview`)}>
                  {p.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => navigate("/app/projects/new/source")}>
            Create Project
          </CommandItem>
          <CommandItem onSelect={() => navigate("/app/import/vercel")}>
            Import from Vercel
          </CommandItem>
          <CommandItem onSelect={() => navigate(projectId ? `${pathname}?dialog=deploy-now` : "/app/usage?dialog=set-budget")}>
            {projectId ? "Deploy Now" : "Set Budget"}
          </CommandItem>
          {projectId && (
            <CommandItem onSelect={() => navigate(`/app/projects/${projectId}/domains?dialog=add-domain`)}>
              Add Domain
            </CommandItem>
          )}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Docs">
          {docsNav.slice(0, 5).map((item) => (
            <CommandItem key={item.href} onSelect={() => navigate(item.href)}>
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Keyboard shortcuts">
          <CommandItem disabled>⌘K — Open command palette</CommandItem>
          <CommandItem disabled>G then P — Go to projects</CommandItem>
          <CommandItem disabled>G then O — Go to overview</CommandItem>
          <CommandItem disabled>G then D — Go to deployments</CommandItem>
          <CommandItem disabled>? — Show keyboard shortcuts</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function CommandPaletteTrigger() {
  return (
    <button
      className="hidden sm:flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
      onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
    >
      <span>Search...</span>
      <kbd className="rounded border bg-background px-1 font-mono text-[10px]">⌘K</kbd>
    </button>
  );
}
