"use client";

import { type OTPType, resendVerificationOTP } from "@/server/resend-otp";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ResendOtpButtonProps {
  email: string;
  otpType: OTPType;
  className?: string;
}

export default function ResendOtpButton({
  email,
  otpType,
  className,
}: ResendOtpButtonProps) {
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start or restart the countdown timer
  const startCountdown = useCallback(() => {
    // Clear existing timer if any
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start a new countdown timer
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Initialize countdown on component mount
  useEffect(() => {
    startCountdown();

    // Cleanup on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startCountdown]);

  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);

    const { message } = await resendVerificationOTP(email, otpType);

    if (message) {
      toast.error(message);
    } else {
      toast.success("Verification code resent successfully");
      setCountdown(30);
      startCountdown();
    }

    setIsResending(false);
  };

  return (
    <button
      type="button"
      onClick={handleResendOtp}
      disabled={countdown > 0 || isResending}
      className={`text-center font-medium ${
        countdown > 0 || isResending
          ? "pointer-events-none text-primary/50 dark:text-primary/60"
          : "cursor-pointer text-primary"
      } ${className || ""}`}
      aria-live="polite"
    >
      Didn't receive a code? Resend{countdown > 0 ? ` (${countdown})` : ""}
    </button>
  );
}
