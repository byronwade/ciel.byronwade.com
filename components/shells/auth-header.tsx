import Link from "next/link";

export function AuthHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Ciel
        </Link>
        <Link href="/app/support" className="text-sm text-muted-foreground hover:text-foreground">
          Support
        </Link>
      </div>
    </header>
  );
}
