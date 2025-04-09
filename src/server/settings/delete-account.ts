"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface DeleteAccountState {
  alert: string | null;
}

const VERIFICATION_TEXT = "Delete account";

export async function deleteAccount(
  _prevState: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  const verify = formData.get("verify");

  if (verify !== VERIFICATION_TEXT) {
    return {
      alert: "Please type the verification text exactly as shown",
    };
  }
  const { error } = await tryCatch(
    auth.api.deleteUser({
      body: {},
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
