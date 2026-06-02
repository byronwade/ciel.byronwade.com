"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shells/theme-toggle";
import { Bell } from "lucide-react";

export function WorkspaceHeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <Button variant="ghost" size="icon-sm" aria-label="Notifications" render={<Link href="/app/notifications" />}>
        <Bell />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Account menu" className="rounded-full" />}>
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">AC</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href="/app/settings/profile" />}>Profile</DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/app/settings/api-tokens" />}>API Tokens</DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/auth/passkey-upgrade" />}>Add passkey</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/auth/logout" />}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
