import { db } from "@/db";
import { account, session, user, verification } from "@/db/schema";
import { sendEmail } from "@/server/mail";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { tryCatch } from "./try-catch";

export const auth = betterAuth({
  appName: "Helzar",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
    expiresIn: 60 * 60 * 24 * 30,
    freshAge: 0,
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "github"],
      allowDifferentEmails: true,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      async sendVerificationOTP({ email, otp }) {
        const { error } = await tryCatch(
          sendEmail({
            to: email,
            subject: `${otp} is your verification code`,
            text: `Your verification code: ${otp}`,
          })
        );

        if (error) {
          throw new Error("Failed to send verification email");
        }
      },
    }),
    nextCookies(),
  ],
});
