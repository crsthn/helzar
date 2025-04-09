"use client";

import { ActionButton } from "@/components/ui/action-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { auth } from "@/lib/auth";
import { removeAvatar } from "@/server/settings/avatar";
import { useState } from "react";
import { toast } from "sonner";

interface AvatarSettingsProps {
  session: typeof auth.$Infer.Session;
}

export function AvatarSettings({ session }: AvatarSettingsProps) {
  const [isPending, setIsPending] = useState(false);
  const avatarFallback = session.user.name
    ? session.user.name[0]
    : (session.user.email[0] ?? "U");

  const handleRemove = async () => {
    setIsPending(true);
    const { alert } = await removeAvatar();
    if (alert) {
      toast.error(alert);
    } else {
      toast.success("Profile picture removed successfully");
    }
    setIsPending(false);
  };

  return (
    <>
      <Avatar>
        <AvatarImage src={session.user.image as string} alt="User" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="flex gap-2">
        <ActionButton color="secondary" variant="subtle">
          Upload
        </ActionButton>
        {session.user.image !== null && (
          <ActionButton
            loading={isPending}
            disabled={isPending}
            color="danger"
            variant="subtle"
            onClick={handleRemove}
          >
            Remove
          </ActionButton>
        )}
      </div>
    </>
  );
}
