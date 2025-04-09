"use server";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/lib/try-catch";
import { emailSchema, passwordSchema } from "@/schemas/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserWithAccount } from "./user";

type LoginState = {
  step: 1 | 2;
  email: string | null;
  alert: string | null;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
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

      const { data, error } = await tryCatch(
        getUserWithAccount(result.data.email)
      );

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
        email: result.data.email,
        alert: null,
      };
    }
    case 2: {
      const result = passwordSchema.safeParse(rawData);
      if (!result.success) {
        return {
          ...prevState,
          alert: "Please check your password",
        };
      }

      const { error } = await tryCatch(
        auth.api.signInEmail({
          body: {
            email: prevState.email!,
            password: result.data.password,
          },
          headers: await headers(),
        })
      );

      if (error instanceof APIError) {
        return {
          ...prevState,
          alert: "Invalid email or password",
        };
      }
      redirect("/settings/profile");
    }
  }
}
