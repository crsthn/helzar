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
import { setPassword } from "@/server/settings/password";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SetPasswordDialog() {
  const [state, action, isPending] = useActionState(setPassword, {
    alert: null,
    success: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.alert) {
      toast.error(state.alert);
    } else if (state.success) {
      toast.success("Password updated successfully.");
      setDialogOpen(false);
      router.refresh();
    }
  }, [state, router]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        className={buttonStyles({
          color: "secondary",
          variant: "subtle",
        })}
      >
        Set password
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Set password</DialogTitle>
        </DialogHeader>
        <Form className="gap-0" action={action}>
          <DialogMain>
            <DialogDescription>
              Set a new password for your account. This password will be used to
              sign in to your account.
            </DialogDescription>

            <Field name="password" disabled={isPending}>
              <FieldLabel>Password</FieldLabel>
              <Input
                autoFocus
                type="password"
                placeholder="Enter your password"
                required
                minLength={8}
              />
              <FieldError />
            </Field>
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
