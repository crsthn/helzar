"use client";

import { ActionButton } from "@/components/ui/action-button";
import { Field, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { auth } from "@/lib/auth";
import { editName } from "@/server/settings/name";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface NameFieldProps {
  session: typeof auth.$Infer.Session;
}

export default function EditNameField({ session }: NameFieldProps) {
  const [state, action, isPending] = useActionState(editName, {
    alert: null,
    success: false,
  });
  const [name, setName] = useState<string>(session.user.name);

  useEffect(() => {
    if (state.alert) {
      toast.error(state.alert);
    } else if (state.success) {
      toast.success("Your name has been updated.");
    }
  }, [state]);

  return (
    <Form className="flex-row gap-3" action={action}>
      <Field name="name" disabled={isPending}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
        />
      </Field>
      <ActionButton
        color="secondary"
        variant="subtle"
        type="submit"
        loading={isPending}
      >
        Change
      </ActionButton>
    </Form>
  );
}
