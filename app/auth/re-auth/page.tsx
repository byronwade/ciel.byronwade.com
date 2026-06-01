import { SimpleAuthPage } from "@/components/auth/simple-auth-page";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";

export default function ReAuthPage() {
  return (
    <SimpleAuthPage title="Confirm your identity" description="This action requires additional verification before proceeding.">
      <Button className="w-full"><Fingerprint data-icon="inline-start" />Verify with passkey</Button>
    </SimpleAuthPage>
  );
}
