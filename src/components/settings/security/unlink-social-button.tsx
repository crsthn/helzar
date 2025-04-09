"use client";

import { ActionButton } from "@/components/ui/action-button";
import { authClient } from "@/lib/auth-client";
import type { SocialProvider } from "@/server/settings/account";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UnlinkSocialButton({
  provider,
}: { provider: SocialProvider }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ActionButton
      variant="subtle"
      color="secondary"
      onClick={async () => {
        setIsLoading(true);
        const { error } = await authClient.unlinkAccount({
          providerId: provider,
        });
        if (error) {
          toast.error(error.message);
          setIsLoading(false);
        } else {
          toast.success("Account disconnected");
          router.refresh();
        }
      }}
      loading={isLoading}
    >
      Disconnect
    </ActionButton>
  );
}
