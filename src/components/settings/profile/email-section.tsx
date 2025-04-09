import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EmailSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <Card className="flex items-center gap-2 p-6">
      <p>{session.user.email}</p>
      <Badge>Verified</Badge>
    </Card>
  );
}
