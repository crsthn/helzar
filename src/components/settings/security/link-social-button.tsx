"use client";

import { ActionButton } from "@/components/ui/action-button";
import { authClient } from "@/lib/auth-client";
import type { SocialProvider } from "@/server/settings/account";
import { useState } from "react";
import { toast } from "sonner";

export default function LinkSocialButton({
  provider,
}: { provider: SocialProvider }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ActionButton
      variant="subtle"
      color="secondary"
      loading={isLoading}
      onClick={async () => {
        setIsLoading(true);
        const { error } = await authClient.linkSocial({
          provider,
          callbackURL: "/settings/security",
        });
        if (error) {
          toast.error(`Failed to connect with ${provider}.`);
          setIsLoading(false);
        }
      }}
    >
      Connect
    </ActionButton>
  );
}
