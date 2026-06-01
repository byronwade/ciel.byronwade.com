import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ParsedIssue } from "@/types";
import { AlertCircle, AlertTriangle } from "lucide-react";

interface ParsedIssueCardProps {
  issue: ParsedIssue;
}

export function ParsedIssueCard({ issue }: ParsedIssueCardProps) {
  const Icon = issue.severity === "error" ? AlertCircle : AlertTriangle;

  return (
    <Alert variant={issue.severity === "error" ? "destructive" : "default"}>
      <Icon />
      <AlertTitle>{issue.title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{issue.description}</p>
        <p className="text-sm">
          <span className="font-medium">Likely cause:</span> {issue.likelyCause}
        </p>
        <Button variant="outline" size="sm" className="w-fit" asChild>
          <Link href={issue.fixHref}>{issue.fixAction}</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
