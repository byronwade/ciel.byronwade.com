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
    <Alert className="rounded-none border-x-0 border-t-0">
      <AlertTriangle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {message}
        {href && (
          <>
            {" "}
            <Link href={href} className="underline font-medium">
              View details
            </Link>
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
