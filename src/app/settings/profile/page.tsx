import DeleteAccountDialog from "@/components/settings/profile/delete-account-dialog";
import DisplayNameSection from "@/components/settings/profile/display-name-section";
import EmailSection from "@/components/settings/profile/email-section";
import ProfilePictureSection from "@/components/settings/profile/profile-picture-section";
import DisplayNameSkeleton from "@/components/settings/profile/skeletons/display-name-skeleton";
import EmailSkeleton from "@/components/settings/profile/skeletons/email-skeleton";
import ProfilePictureSkeleton from "@/components/settings/profile/skeletons/profile-picture-skeleton";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <h2>Profile</h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-medium">Profile picture</p>
          <p className="text-text-2">
            Recommended size is 256x256px, up to 10MB.
          </p>
        </div>
        <Suspense fallback={<ProfilePictureSkeleton />}>
          <ProfilePictureSection />
        </Suspense>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-medium">Display Name</p>
        <Suspense fallback={<DisplayNameSkeleton />}>
          <DisplayNameSection />
        </Suspense>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-medium">Email address</p>
        <Suspense fallback={<EmailSkeleton />}>
          <EmailSection />
        </Suspense>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-medium">Danger zone</p>
        <Card className="flex items-center justify-between p-6">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Delete account</p>
            <p className="text-text-2">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <DeleteAccountDialog />
        </Card>
      </div>
    </div>
  );
}
