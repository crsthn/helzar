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
import { logOut } from "@/server/settings/session";
import { useState } from "react";
import { toast } from "sonner";

export default function LogOutDialog() {
  const [isPending, setIsPending] = useState(false);

  const handleRemove = async () => {
    setIsPending(true);
    const { alert } = await logOut();
    if (alert) {
      toast.error(alert);
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonStyles({
          color: "secondary",
          variant: "subtle",
        })}
      >
        Log out
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out from this session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose color="secondary" disabled={isPending}>
            Cancel
          </AlertDialogClose>
          <ActionButton
            className="w-full"
            onClick={handleRemove}
            loading={isPending}
          >
            Log out
          </ActionButton>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
