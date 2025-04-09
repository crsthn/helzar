"use client";

import Social from "@/components/auth/social";
import { ActionButton } from "@/components/ui/action-button";
import { Field, FieldError, FieldLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/server/login";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import Helzar from "../../../public/helzar";

export default function LoginForm() {
  const [state, action, isFormPending] = useActionState(loginAction, {
    step: 1,
    email: null,
    alert: null,
  });

  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  const isPending = isFormPending || loadingProvider !== null;

  useEffect(() => {
    if (state.alert) {
      toast.error(state.alert);
    }
  }, [state]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="flex w-full max-w-xs flex-col items-center gap-8"
        key={state.step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, type: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-4">
          <Helzar className="fill-primary" height={32} width={32} />
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-semibold text-2xl">
              {state.step === 1 ? "Login to Helzar" : "Welcome back!"}
            </h1>
            <p className="text-text-2">
              {state.step === 1 ? (
                <>
                  Don't have an account?&nbsp;
                  <Link
                    href="/signup"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                state.email
              )}
            </p>
          </div>
        </div>
        <Form action={action}>
          {state.step === 1 ? (
            <Field name="email" disabled={isPending}>
              <FieldLabel>Email address</FieldLabel>
              <Input
                autoFocus
                type="email"
                placeholder="name@email.com"
                required
              />
              <FieldError />
            </Field>
          ) : (
            <Field name="password" disabled={isPending}>
              <FieldLabel>Password</FieldLabel>
              <Input
                autoFocus
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
              />
              <FieldError />
            </Field>
          )}
          <ActionButton
            type="submit"
            loading={isFormPending}
            disabled={isPending}
          >
            Continue
          </ActionButton>
        </Form>
        {state.step === 1 ? (
          <>
            <p className="text-text-3 text-xs">OR</p>

            <Social
              isPending={isPending}
              loadingProvider={loadingProvider}
              onLoadingChange={setLoadingProvider}
            />
          </>
        ) : (
          <Link
            href={`/reset-password?email=${encodeURIComponent(state.email || "")}`}
            className="font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
