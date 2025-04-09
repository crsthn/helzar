"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export interface EditAvatarState {
  alert: string | null;
}

export async function removeAvatar(): Promise<EditAvatarState> {
  const { error } = await tryCatch(
    auth.api.updateUser({
      body: {
        image: null,
      },
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    return {
      alert: error.body?.code || "Something went wrong",
    };
  }

  return {
    alert: null,
  };
}
