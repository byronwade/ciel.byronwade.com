import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface WarningBannerProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export function WarningBanner({ title, message, actionLabel, actionHref }: WarningBannerProps) {
  return (
    <Alert className="border-warning/40 bg-warning/10 [&>svg]:text-warning">
      <AlertTriangle />
      <AlertTitle className="text-foreground">{title}</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        {message}
        {actionLabel && actionHref && (
          <>
            {" "}
            <Link href={actionHref} className="font-medium text-foreground underline underline-offset-3">
              {actionLabel}
            </Link>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
