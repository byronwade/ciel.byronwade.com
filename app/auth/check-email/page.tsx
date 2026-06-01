import { SimpleAuthPage } from "@/components/auth/simple-auth-page";

export default function CheckEmailPage() {
  return (
    <SimpleAuthPage
      title="Check your email"
      description="We sent a link to your email address. It expires in 15 minutes."
      actionLabel="Back to login"
      actionHref="/auth/login"
    />
  );
}
