"use client";

import ResendOtpButton from "@/components/auth/resend-otp-button";
import { ActionButton } from "@/components/ui/action-button";
import { Field, FieldError, FieldLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetPasswordAction } from "@/server/reset-password";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Helzar from "../../../public/helzar";

export default function ResetPasswordForm() {
  const [state, action, isFormPending] = useActionState(resetPasswordAction, {
    step: 1,
    data: {},
    alert: null,
  });

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
                ? "Reset your password"
                : state.step === 2
                  ? "Create new password"
                  : "Verify your email"}
            </h1>
            {state.step === 1 ? (
              <p className="text-text-2">
                Enter your email to receive a verification code
              </p>
            ) : state.step === 2 ? (
              <p className="text-center text-text-2">
                Choose a new password for your account
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
            <Field name="email" disabled={isFormPending}>
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
            <Field name="password" disabled={isFormPending}>
              <FieldLabel>New password</FieldLabel>
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
                disabled={isFormPending}
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
            disabled={isFormPending}
          >
            {state.step === 3 ? "Reset password" : "Continue"}
          </ActionButton>
        </Form>
        {state.step === 1 ? (
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Back to login
          </Link>
        ) : (
          state.step === 3 && (
            <ResendOtpButton
              email={state.data.email as string}
              otpType="forget-password"
              className="self-center"
            />
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
}
