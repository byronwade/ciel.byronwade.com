import { AuthCard } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import Link from "next/link";

const authPageContent: Record<string, { title: string; description?: string; action?: string; href?: string }> = {
  "check-email": { title: "Check your email", description: "We sent a link to your email address. It expires in 15 minutes.", action: "Back to login", href: "/auth/login" },
  "verify-code": { title: "Enter verification code", description: "Paste your 6-digit code below." },
  "passkey-upgrade": { title: "Add a passkey", description: "Passkeys are recommended for security and convenience. They work with your device's biometrics or security key." },
  "mfa/setup": { title: "Set up two-factor authentication", description: "Scan the QR code with your authenticator app, or use a passkey instead." },
  "mfa/challenge": { title: "Verify it's you", description: "Use your passkey or enter a code from your authenticator app." },
  "mfa/recovery": { title: "Account recovery", description: "Enter a backup code, use an alternate enrolled factor, or contact support." },
  "recovery-codes": { title: "Save your recovery codes", description: "Store these codes securely. Each can only be used once." },
  sso: { title: "Single sign-on", description: "Continue with your organization's identity provider." },
  "invite/accept": { title: "Accept invitation", description: "You've been invited to join Acme Corp on Ciel." },
  "device-approval": { title: "Approve new device", description: "Chrome on macOS · San Francisco, CA · Just now" },
  "re-auth": { title: "Confirm your identity", description: "This action requires additional verification." },
};

export function generateStaticParams() {
  return Object.keys(authPageContent).map((slug) => ({ slug: slug.replace("/", "-") }));
}

// Individual pages use shared template via direct files; this handles dynamic ones if needed
