import ConnectedAccountsSection from "@/components/settings/security/connected-accounts-section";
import PasswordSection from "@/components/settings/security/password-section";
import SessionsSection from "@/components/settings/security/sessions-section";
import AccountsSkeleton from "@/components/settings/security/skeletons/accounts-skeleton";
import PasswordSkeleton from "@/components/settings/security/skeletons/password-skeleton";
import SessionsSkeleton from "@/components/settings/security/skeletons/sessions-skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <h2>Security and access</h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-medium">Sessions</p>
          <p className="text-text-2">
            Manage your active sessions and sign out of devices.
          </p>
        </div>
        <Suspense fallback={<SessionsSkeleton />}>
          <SessionsSection />
        </Suspense>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-medium">Password</p>
          <p className="text-text-2">
            Change your password to keep your account secure.
          </p>
        </div>
        <Suspense fallback={<PasswordSkeleton />}>
          <PasswordSection />
        </Suspense>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-medium">Connected accounts</p>
          <p className="text-text-2">
            Manage the third-party accounts connected.
          </p>
        </div>
        <Suspense fallback={<AccountsSkeleton />}>
          <ConnectedAccountsSection />
        </Suspense>
      </div>
    </div>
  );
}
