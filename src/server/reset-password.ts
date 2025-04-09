"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { emailSchema, otpSchema, passwordSchema } from "@/schemas/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUser } from "./user";

type ResetPasswordData = {
  email: string;
  otp: string;
  password: string;
};

export type ResetPasswordState = {
  step: 1 | 2 | 3;
  data: Partial<ResetPasswordData>;
  alert: string | null;
};

export async function resetPasswordAction(
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const rawData = Object.fromEntries(formData);

  switch (prevState.step) {
    case 1: {
      const result = emailSchema.safeParse(rawData);
      if (!result.success) {
        return {
          ...prevState,
          alert: "Please enter a valid email address",
        };
      }

      const { data, error } = await tryCatch(getUser(result.data.email));

      if (error) {
        return {
          ...prevState,
          alert: "Unable to verify email",
        };
      }

      if (!data[0]) {
        return {
          ...prevState,
          alert: "No account found with this email",
        };
      }

      return {
        step: 2,
        data: result.data,
        alert: null,
      };
    }
    case 2: {
      const result = passwordSchema.safeParse(rawData);
      if (!result.success) {
        return {
          ...prevState,
          alert: "Password must be at least 8 characters",
        };
      }

      const { error } = await tryCatch(
        auth.api.forgetPasswordEmailOTP({
          body: {
            email: prevState.data.email!,
          },
        })
      );

      if (error instanceof APIError) {
        return {
          ...prevState,
          alert: "Unable to send verification code",
        };
      }

      return {
        step: 3,
        data: { ...prevState.data, ...result.data },
        alert: null,
      };
    }
    case 3: {
      const result = otpSchema.safeParse(rawData);
      if (!result.success) {
        return {
          ...prevState,
          alert: "Please enter the 6-digit code",
        };
      }

      const { error: resetError } = await tryCatch(
        auth.api.resetPasswordEmailOTP({
          body: {
            email: prevState.data.email!,
            otp: result.data.otp,
            password: prevState.data.password!,
          },
        })
      );

      if (resetError instanceof APIError) {
        return {
          ...prevState,
          alert: resetError.body?.message || "Something went wrong",
        };
      }

      // Auto-login after successful password reset
      const { error: signInError } = await tryCatch(
        auth.api.signInEmail({
          body: {
            email: prevState.data.email!,
            password: prevState.data.password!,
          },
          headers: await headers(),
        })
      );

      if (signInError instanceof APIError) {
        // If auto-login fails, redirect to login page with success message
        redirect("/login");
      }

      // If auto-login succeeds, redirect to profile page
      redirect("/settings/profile");
    }
  }
}
