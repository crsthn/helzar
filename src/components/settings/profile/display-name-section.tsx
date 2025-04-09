import EditNameField from "@/components/settings/profile/edit-name-field";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DisplayNameSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <Card className="flex items-center justify-between p-6">
      <EditNameField session={session} />
    </Card>
  );
}
