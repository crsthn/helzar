import { AvatarSettings } from "@/components/settings/profile/avatar-settings";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePictureSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return (
    <Card className="flex items-center justify-between p-6">
      <AvatarSettings session={session} />
    </Card>
  );
}
