"use client";

import { ActionButton } from "@/components/ui/action-button";
import { buttonStyles } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMain,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteAccount } from "@/server/settings/delete-account";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const VERIFICATION_TEXT = "Delete account";

export default function DeleteAccountDialog() {
  const [state, action, isPending] = useActionState(deleteAccount, {
    alert: null,
  });

  useEffect(() => {
    if (state.alert) {
      toast.error(state.alert);
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger
        className={buttonStyles({
          color: "danger",
          variant: "subtle",
        })}
      >
        Delete
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
        </DialogHeader>
        <Form className="gap-0" action={action}>
          <DialogMain>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot
              be undone. All your data will be permanently removed.
            </DialogDescription>

            <Field name="verify" disabled={isPending}>
              <FieldLabel>
                Type &quot;{VERIFICATION_TEXT}&quot; below to continue.
              </FieldLabel>

              <Input
                autoFocus
                placeholder={VERIFICATION_TEXT}
                pattern={VERIFICATION_TEXT}
                required
              />
              <FieldError />
            </Field>
          </DialogMain>

          <DialogFooter>
            <DialogClose color="secondary" disabled={isPending}>
              Cancel
            </DialogClose>
            <ActionButton
              color="danger"
              type="submit"
              className="w-full"
              loading={isPending}
            >
              Delete account
            </ActionButton>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
