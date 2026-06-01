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
    <Alert variant="default" className="border-amber-500/30 bg-amber-500/5">
      <AlertTriangle className="text-amber-600" />
      <AlertTitle className="text-amber-800 dark:text-amber-400">{title}</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        {message}
        {actionLabel && actionHref && (
          <>
            {" "}
            <Link href={actionHref} className="underline font-medium">
              {actionLabel}
            </Link>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
