"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailPayload = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, text, html }: EmailPayload) {
  return resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text,
    html: html || `<p>${text}</p>`,
  });
}
