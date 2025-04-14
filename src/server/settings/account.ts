"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export type SocialProvider = "github" | "google";

export async function linkSocialAccount(provider: SocialProvider) {
  const { error } = await tryCatch(
    auth.api.linkSocialAccount({
      body: {
        provider,
      },
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    console.error(error.body?.code || "Something went wrong");
  }
}
