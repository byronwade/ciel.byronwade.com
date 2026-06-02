import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface TrustBannerProps {
  title: string;
  message: string;
  href?: string;
}

export function TrustBanner({ title, message, href }: TrustBannerProps) {
  return (
    <Alert className="rounded-none border-x-0 border-t-0 border-warning/30 bg-warning/10 [&>svg]:text-warning">
      <AlertTriangle />
      <AlertTitle className="text-foreground">{title}</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        {message}
        {href && (
          <>
            {" "}
            <Link href={href} className="font-medium text-foreground underline underline-offset-3">
              View details
            </Link>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
