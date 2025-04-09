"use client";

import { ActionButton } from "@/components/ui/action-button";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonStyles } from "@/components/ui/button";
import type { auth } from "@/lib/auth";
import { revokeSession } from "@/server/settings/session";
import { useState } from "react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";

type RevokeDialogProps = {
  session: typeof auth.$Infer.Session.session;
};

export default function RevokeDialog({ session }: RevokeDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRevoke = async () => {
    setIsPending(true);

    const { alert } = await revokeSession(session.token);
    if (alert) {
      toast.error(alert);
    } else {
      toast.success("Session revoked successfully");
    }

    setIsPending(false);
    setDialogOpen(false);
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger
        className={buttonStyles({
          color: "secondary",
          variant: "subtle",
        })}
      >
        Revoke
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke access?</AlertDialogTitle>
          <AlertDialogDescription>
            Revoke access to "
            {new UAParser(session.userAgent || "").getBrowser().name} on{" "}
            {new UAParser(session.userAgent || "").getOS().name}"?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose color="secondary" disabled={isPending}>
            Cancel
          </AlertDialogClose>
          <ActionButton
            color="danger"
            className="w-full"
            onClick={handleRevoke}
            loading={isPending}
          >
            Revoke
          </ActionButton>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
