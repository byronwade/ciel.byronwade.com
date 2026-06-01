"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Fingerprint, KeyRound } from "lucide-react";
import { setMockSession, createMockSession } from "@/lib/auth/mock-session";

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePasskey = () => {
    setMockSession(createMockSession("user@example.com", "Demo User"));
    const next = searchParams.get("next");
    router.push(next && next.startsWith("/app") ? next : "/app/overview");
  };

  return (
    <AuthCard title="Sign in to Ciel" description="Passkey recommended for security and convenience">
      <div className="flex flex-col gap-4">
        <Button variant="outline" className="w-full" onClick={handlePasskey}>
          <Fingerprint data-icon="inline-start" />
          Continue with passkey
        </Button>
        <div className="relative text-center text-xs text-muted-foreground">
          <span className="bg-card px-2 relative z-10">or use password</span>
          <div className="absolute inset-x-0 top-1/2 border-t" />
        </div>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" autoComplete="current-password" />
          </Field>
        </FieldGroup>
        <Button className="w-full" onClick={handlePasskey}>Sign in</Button>
        <div className="flex flex-col gap-2 text-center text-sm">
          <Link href="/auth/forgot-password" className="text-muted-foreground hover:text-foreground">Forgot password?</Link>
          <Link href="/auth/sso" className="text-muted-foreground hover:text-foreground">Continue with SSO</Link>
          <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground">Create an account</Link>
        </div>
      </div>
    </AuthCard>
  );
}

export function SignupForm() {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/auth/verify-email");
  };

  return (
    <AuthCard title="Create your Ciel account">
      <div className="flex flex-col gap-4">
        <Button variant="outline" className="w-full" onClick={handleSignup}>
          <Fingerprint data-icon="inline-start" />
          Sign up with passkey
        </Button>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" autoComplete="name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="signup-email">Email</FieldLabel>
            <Input id="signup-email" type="email" autoComplete="email" />
          </Field>
          <Field>
            <FieldLabel htmlFor="signup-password">Password</FieldLabel>
            <Input id="signup-password" type="password" autoComplete="new-password" />
          </Field>
        </FieldGroup>
        <Button className="w-full" onClick={handleSignup}>Create account</Button>
        <p className="text-xs text-muted-foreground text-center">
          Preference: <Button variant="link" className="h-auto p-0 text-xs">Cloud</Button> · <Button variant="link" className="h-auto p-0 text-xs">Self-host interest</Button>
        </p>
        <Link href="/auth/login" className="text-sm text-center text-muted-foreground hover:text-foreground">Already have an account?</Link>
      </div>
    </AuthCard>
  );
}

export function CodeInput({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Verification code</FieldLabel>
          <Input
            maxLength={6}
            placeholder="000000"
            className="text-center text-2xl tracking-[0.5em] font-mono"
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text").slice(0, 6);
              if (pasted.length === 6) onComplete?.();
            }}
          />
        </Field>
      </FieldGroup>
      <p className="text-xs text-muted-foreground text-center">Resend available in 58s · <Link href="/auth/mfa/recovery">Try another method</Link></p>
    </div>
  );
}

export function PasswordResetForm({ confirm = false }: { confirm?: boolean }) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="new-password">New password</FieldLabel>
        <Input id="new-password" type="password" autoComplete="new-password" />
      </Field>
      {confirm && (
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
          <Input id="confirm-password" type="password" autoComplete="new-password" />
        </Field>
      )}
    </FieldGroup>
  );
}
