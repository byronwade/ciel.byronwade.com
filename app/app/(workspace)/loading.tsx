import { Skeleton } from "@/components/ui/skeleton";

export default function WorkspaceLoading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-2">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
      <Skeleton className="h-64 mt-2" />
    </div>
  );
}
