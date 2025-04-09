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
import { revokeOtherSessions } from "@/server/settings/session";
import { useState } from "react";
import { toast } from "sonner";

export default function RevokeOtherDialog() {
  const [isPending, setIsPending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRevokeOther = async () => {
    setIsPending(true);

    const { alert } = await revokeOtherSessions();
    if (alert) {
      toast.error(alert);
    } else {
      toast.success("Other sessions revoked successfully");
    }

    setIsPending(false);
    setDialogOpen(false);
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger
        className={buttonStyles({
          color: "danger",
          variant: "subtle",
        })}
      >
        Revoke all
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke access?</AlertDialogTitle>
          <AlertDialogDescription>
            Revoke all other sessions? This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose color="secondary" disabled={isPending}>
            Cancel
          </AlertDialogClose>
          <ActionButton
            color="danger"
            className="w-full"
            onClick={handleRevokeOther}
            loading={isPending}
          >
            Revoke
          </ActionButton>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
