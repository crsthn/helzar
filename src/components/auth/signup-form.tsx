"use client";

import ResendOtpButton from "@/components/auth/resend-otp-button";
import Social from "@/components/auth/social";
import { ActionButton } from "@/components/ui/action-button";
import { Field, FieldError, FieldLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { signUpAction } from "@/server/signup";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Helzar from "../../../public/helzar";

export default function SignUpForm() {
  const [state, action, isFormPending] = useActionState(signUpAction, {
    step: 1,
    data: {},
    alert: null,
  });

  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  const isPending = isFormPending || loadingProvider !== null;

  const formRef = useRef<HTMLFormElement>(null);

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
              {state.step === 1
                ? "Create your account"
                : state.step === 2
                  ? "Secure your account"
                  : "Verify your email"}
            </h1>
            {state.step === 1 ? (
              <p className="text-text-2">
                Already have an account?&nbsp;
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Log in
                </Link>
              </p>
            ) : state.step === 2 ? (
              <p className="text-center text-text-2">
                Choose a password to keep your account safe.
              </p>
            ) : (
              <p className="text-center text-text-2">
                Enter the verification code we just sent to:{" "}
                <span className="font-medium">{state.data.email}</span>
              </p>
            )}
          </div>
        </div>
        <Form action={action} ref={formRef}>
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
          ) : state.step === 2 ? (
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
          ) : (
            <Field name="otp" className="items-center">
              <InputOTP
                autoFocus
                id="otp"
                name="otp"
                required
                disabled={isPending}
                maxLength={6}
                minLength={6}
                onComplete={() => formRef.current?.requestSubmit()}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
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
            <p className="text-center text-text-2 text-xs">
              By signing up, you agree to our{" "}
              <Link
                href="/"
                className="font-medium text-primary hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="font-medium text-primary hover:underline"
              >
                Data Processing Agreement
              </Link>
              .
            </p>
          </>
        ) : (
          state.step === 3 && (
            <ResendOtpButton
              email={state.data.email as string}
              otpType="email-verification"
            />
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
}
