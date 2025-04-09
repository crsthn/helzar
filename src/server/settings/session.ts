"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface SessionState {
  alert: string | null;
}

export async function revokeSession(token: string): Promise<SessionState> {
  const { error } = await tryCatch(
    auth.api.revokeSession({
      body: {
        token,
      },
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    return {
      alert: error.body?.code || "Something went wrong",
    };
  }

  revalidatePath("/settings/security");

  return {
    alert: null,
  };
}

export async function logOut(): Promise<SessionState> {
  const { error } = await tryCatch(
    auth.api.signOut({
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    return {
      alert: error.body?.code || "Something went wrong",
    };
  }

  redirect("/");
}

export async function revokeOtherSessions(): Promise<SessionState> {
  const { error } = await tryCatch(
    auth.api.revokeOtherSessions({
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    return {
      alert: error.body?.code || "Something went wrong",
    };
  }

  revalidatePath("/settings/security");

  return {
    alert: null,
  };
}
