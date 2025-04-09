import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <h2>Preferences</h2>
      <div className="flex flex-col gap-3">
        <p className="font-medium">Interface and theme</p>
        <Card className="flex items-center justify-between gap-3 p-6">
          <p>Interface theme</p>
          <ThemeToggle />
        </Card>
      </div>
    </div>
  );
}
