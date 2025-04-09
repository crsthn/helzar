import { buttonStyles } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-bold text-5xl">404</h1>
      <p className="my-6 text-sm text-text-2">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className={buttonStyles({
          size: "lg",
        })}
      >
        Go to the home page
      </Link>
    </main>
  );
}
