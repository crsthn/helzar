import SignUpForm from "@/components/auth/signup-form";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignUpForm />
    </Suspense>
  );
}
