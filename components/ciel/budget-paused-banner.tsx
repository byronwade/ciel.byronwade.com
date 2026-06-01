import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PauseCircle } from "lucide-react";

interface BudgetPausedBannerProps {
  projectName: string;
  environment?: string;
  resumeHref?: string;
}

export function BudgetPausedBanner({
  projectName,
  environment = "production",
  resumeHref = "?dialog=resume-project",
}: BudgetPausedBannerProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <PauseCircle />
      <AlertTitle>{environment} paused — budget cap reached</AlertTitle>
      <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>
          {projectName} {environment} is frozen. Previews and staging remain online. Increase the cap to resume.
        </span>
        <Button variant="outline" size="sm" className="w-fit shrink-0" render={<Link href={resumeHref} />}>
          Resume with new limit
        </Button>
      </AlertDescription>
    </Alert>
  );
}
