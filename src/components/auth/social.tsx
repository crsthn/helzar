"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Github from "../../../public/github";
import Google from "../../../public/google";
import { ActionButton } from "../ui/action-button";

interface SocialProps {
  isPending: boolean;
  loadingProvider?: "google" | "github" | null;
  onLoadingChange?: (provider: "google" | "github" | null) => void;
}

export default function Social({
  isPending,
  loadingProvider,
  onLoadingChange,
}: SocialProps) {
  const handleSocialLogin = async (provider: "google" | "github") => {
    onLoadingChange?.(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/settings/profile",
    });
    if (error) {
      toast.error(`Failed to login with ${provider}.`);
      onLoadingChange?.(null);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <ActionButton
        color="secondary"
        disabled={isPending}
        loading={loadingProvider === "google"}
        onClick={() => handleSocialLogin("google")}
        aria-label="Continue with Google"
      >
        <Google />
        Continue with Google
      </ActionButton>
      <ActionButton
        color="secondary"
        disabled={isPending}
        loading={loadingProvider === "github"}
        onClick={() => handleSocialLogin("github")}
        aria-label="Continue with Github"
      >
        <Github className="fill-text" />
        Continue with Github
      </ActionButton>
    </div>
  );
}
