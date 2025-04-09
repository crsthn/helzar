import ChangePasswordDialog from "@/components/settings/security/change-password";
import SetPasswordDialog from "@/components/settings/security/set-password-dialog";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PasswordSection() {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  const credentialAccount =
    accounts.find((account) => account.provider === "credential") ?? null;

  return (
    <Card className="flex items-center justify-between gap-3 p-6">
      {credentialAccount !== null ? (
        <>
          <p>••••••••••</p>
          <ChangePasswordDialog />
        </>
      ) : (
        <>
          <p className="text-text-2">No password registered</p>
          <SetPasswordDialog />
        </>
      )}
    </Card>
  );
}
