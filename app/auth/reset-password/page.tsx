import { AuthCard, PasswordResetForm } from "@/components/auth/auth-forms";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Set new password">
      <PasswordResetForm confirm />
      <div className="flex items-center gap-2 mt-4">
        <Checkbox id="signout-all" defaultChecked />
        <Label htmlFor="signout-all" className="text-sm">Sign out all other sessions</Label>
      </div>
      <Button className="w-full mt-4" asChild>
        <Link href="/auth/login">Update password</Link>
      </Button>
    </AuthCard>
  );
}
