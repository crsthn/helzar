"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { nameSchema } from "@/schemas/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export interface EditNameState {
  alert: string | null;
  success: boolean;
}

export async function editName(
  _prevState: EditNameState,
  formData: FormData
): Promise<EditNameState> {
  const rawData = Object.fromEntries(formData);

  const result = nameSchema.safeParse(rawData);
  if (!result.success) {
    return {
      alert: "Please enter a valid name.",
      success: false,
    };
  }

  const { error } = await tryCatch(
    auth.api.updateUser({
      body: {
        name: result.data.name,
      },
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    return {
      alert:
        error.body?.code || "Failed to update name. Please try again later",
      success: false,
    };
  }

  return {
    alert: null,
    success: true,
  };
}
