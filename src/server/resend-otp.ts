"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { APIError } from "better-auth/api";

export type OTPType = "email-verification" | "forget-password" | "sign-in";

export type ResendOTPResult = {
  message: string | null;
};

/**
 * Resends verification OTP to the specified email
 * @param email The email address to send the OTP to
 * @param type The type of OTP to send (defaults to "email-verification")
 */
export async function resendVerificationOTP(
  email: string,
  type: OTPType
): Promise<ResendOTPResult> {
  const { error } = await tryCatch(
    auth.api.sendVerificationOTP({
      body: {
        email,
        type,
      },
    })
  );

  if (error instanceof APIError) {
    return {
      message: error.body?.message || "Unable to resend verification code",
    };
  }

  return {
    message: null,
  };
}
