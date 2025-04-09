"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { emailSchema, otpSchema, passwordSchema } from "@/schemas/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUser } from "./user";

type SignUpData = {
  email: string;
  otp: string;
  password: string;
  name: string;
};

export type SignUpState = {
  step: 1 | 2 | 3;
  data: Partial<SignUpData>;
  alert: string | null;
};

export async function signUpAction(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
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

      if (data[0]) {
        return {
          ...prevState,
          alert: "This email is already registered",
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
        auth.api.sendVerificationOTP({
          body: {
            email: prevState.data.email!,
            type: "email-verification",
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

      const { data, error } = await tryCatch(
        auth.api.getVerificationOTP({
          query: {
            email: prevState.data.email!,
            type: "email-verification",
          },
        })
      );

      if (error instanceof APIError) {
        return {
          ...prevState,
          alert: error.body?.message || "Something went wrong",
        };
      }

      if (data && data.otp !== result.data.otp) {
        return {
          ...prevState,
          alert: "Invalid code. Please try again",
        };
      }

      const name = prevState.data.email!.split("@")[0];

      const { error: signUpError } = await tryCatch(
        auth.api.signUpEmail({
          body: {
            email: prevState.data.email!,
            password: prevState.data.password!,
            name,
          },
        })
      );

      if (signUpError instanceof APIError) {
        return {
          ...prevState,
          alert: "Unable to create account",
        };
      }

      const { error: verifyError } = await tryCatch(
        auth.api.verifyEmailOTP({
          body: {
            email: prevState.data.email!,
            otp: result.data.otp,
          },
        })
      );

      if (verifyError instanceof APIError) {
        return {
          ...prevState,
          alert: "Unable to verify email",
        };
      }

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
        return {
          ...prevState,
          alert: "Account created. Please sign in",
        };
      }

      redirect("/settings/profile");
    }
  }
}
