import LinkSocialButton from "@/components/settings/security/link-social-button";
import UnlinkSocialButton from "@/components/settings/security/unlink-social-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Github from "../../../../public/github";
import Google from "../../../../public/google";

export default async function ConnectedAccountsSection() {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  const googleAccount =
    accounts.find((account) => account.provider === "google") ?? null;

  const githubAccount =
    accounts.find((account) => account.provider === "github") ?? null;

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between gap-3 p-6">
        <div className="flex items-center gap-3">
          <Badge className="size-10 rounded-lg p-0" color="secondary">
            <Google width={16} height={16} />
          </Badge>
          <div className="flex flex-col">
            <p className="font-medium">Google</p>
            {googleAccount !== null && <p className="text-text-2">Connected</p>}
          </div>
        </div>
        {googleAccount !== null ? (
          <UnlinkSocialButton provider="google" />
        ) : (
          <LinkSocialButton provider="google" />
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t p-6">
        <div className="flex items-center gap-3">
          <Badge className="size-10 rounded-lg p-0" color="secondary">
            <Github className="fill-text" width={16} height={16} />
          </Badge>
          <div className="flex flex-col">
            <p className="font-medium">GitHub</p>
            {githubAccount !== null && <p className="text-text-2">Connected</p>}
          </div>
        </div>
        {githubAccount !== null ? (
          <UnlinkSocialButton provider="github" />
        ) : (
          <LinkSocialButton provider="github" />
        )}
      </div>
    </Card>
  );
}
