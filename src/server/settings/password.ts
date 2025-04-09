"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { changePasswordSchema, passwordSchema } from "@/schemas/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export interface SetPasswordState {
  alert: string | null;
  success: boolean;
}

export async function setPassword(
  _prevState: SetPasswordState,
  formData: FormData
): Promise<SetPasswordState> {
  const rawData = Object.fromEntries(formData);

  const result = passwordSchema.safeParse(rawData);
  if (!result.success) {
    return {
      alert: "Please enter a valid password.",
      success: false,
    };
  }

  const { error } = await tryCatch(
    auth.api.setPassword({
      body: {
        newPassword: result.data.password,
        headers: await headers(),
      },
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    return {
      alert:
        error.body?.code || "Failed to set password. Please try again later",
      success: false,
    };
  }

  return {
    alert: null,
    success: true,
  };
}

export async function changePassword(
  _prevState: SetPasswordState,
  formData: FormData
): Promise<SetPasswordState> {
  const rawData = Object.fromEntries(formData);

  const result = changePasswordSchema.safeParse(rawData);
  if (!result.success) {
    return {
      alert: "Please enter valid passwords.",
      success: false,
    };
  }

  const { error } = await tryCatch(
    auth.api.changePassword({
      body: {
        newPassword: result.data.newPassword,
        currentPassword: result.data.currentPassword,
      },
      headers: await headers(),
    })
  );

  if (error instanceof APIError) {
    return {
      alert:
        error.body?.message || "Failed to set password. Please try again later",
      success: false,
    };
  }

  return {
    alert: null,
    success: true,
  };
}
