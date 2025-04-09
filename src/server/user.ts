"use server";

import { db } from "@/db";
import { account, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getUser(email: string) {
  return db.select().from(user).where(eq(user.email, email)).limit(1);
}

export async function getUserWithAccount(email: string) {
  return db
    .select()
    .from(user)
    .innerJoin(
      account,
      and(eq(user.id, account.userId), eq(account.providerId, "credential"))
    )
    .where(eq(user.email, email))
    .limit(1);
}
