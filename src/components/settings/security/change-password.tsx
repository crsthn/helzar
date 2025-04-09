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
import { changePassword } from "@/server/settings/password";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordDialog() {
  const [state, action, isPending] = useActionState(changePassword, {
    alert: null,
    success: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (state.alert) {
      toast.error(state.alert);
    } else if (state.success) {
      toast.success("Password updated successfully.");
      setDialogOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        className={buttonStyles({
          color: "secondary",
          variant: "subtle",
        })}
      >
        Change password
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
        <Form className="gap-0" action={action}>
          <DialogMain>
            <DialogDescription>
              Set a new password for your account. This password will be used to
              sign in to your account.
            </DialogDescription>
            <div className="flex flex-col gap-3">
              <Field name="currentPassword" disabled={isPending}>
                <FieldLabel>Current Password</FieldLabel>
                <Input
                  autoFocus
                  type="password"
                  placeholder="Enter your current password"
                  required
                  minLength={8}
                />
                <FieldError />
              </Field>
              <Field name="newPassword" disabled={isPending}>
                <FieldLabel>New password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  required
                  minLength={8}
                />
                <FieldError />
              </Field>
            </div>
          </DialogMain>

          <DialogFooter>
            <DialogClose color="secondary" disabled={isPending}>
              Cancel
            </DialogClose>
            <ActionButton type="submit" className="w-full" loading={isPending}>
              Set password
            </ActionButton>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
