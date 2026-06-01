import { PageHeader } from "@/components/ciel";
import { ThemeToggle } from "@/components/shells/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function PreferencesPage() {
  return (
    <div>
      <PageHeader title="Preferences" scope="Settings" />
      <Card className="max-w-md">
        <CardHeader><CardTitle className="text-sm">Display & notifications</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label>Theme</Label>
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground text-xs">Or select explicitly</Label>
            <Select defaultValue="system">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="email-deploy" defaultChecked />
            <Label htmlFor="email-deploy" className="text-sm">Email on deploy failure</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="email-budget" defaultChecked />
            <Label htmlFor="email-budget" className="text-sm">Email on budget threshold</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
