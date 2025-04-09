import LoginForm from "@/components/auth/login-form";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}
