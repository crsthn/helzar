import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

export const otpSchema = z.object({
  otp: z.string().length(6),
});

export const passwordSchema = z.object({
  password: z.string().min(8),
});

export const nameSchema = z.object({
  name: z.string().min(2),
});

export const avatarSchema = z.object({
  image: z.string().refine((val) => {
    const base64regex = /^data:image\/(jpeg|png|gif|webp);base64,/;
    return base64regex.test(val);
  }, "Invalid image format"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});
