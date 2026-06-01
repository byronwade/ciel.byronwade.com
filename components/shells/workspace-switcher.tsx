"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { mockWorkspace } from "@/lib/mock";
import { ChevronsUpDown } from "lucide-react";

export function WorkspaceSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="sm" className="gap-1 font-normal max-w-[140px]">
            <span className="truncate">{mockWorkspace.name}</span>
            <ChevronsUpDown className="size-3 shrink-0 opacity-50" />
          </Button>
        }
      />
      <DropdownMenuContent align="start">
        <DropdownMenuItem disabled>{mockWorkspace.name}</DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/app/overview" />}>Create workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
