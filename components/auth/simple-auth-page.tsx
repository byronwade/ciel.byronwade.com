import { AuthCard } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SimpleAuthPage({
  title,
  description,
  children,
  actionLabel,
  actionHref,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <AuthCard title={title} description={description}>
      {children}
      {actionLabel && actionHref && (
        <Button className="w-full mt-4" asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </AuthCard>
  );
}
