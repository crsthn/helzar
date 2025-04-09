import Link from "next/link";
import Helzar from "../../../public/helzar";
import { buttonStyles } from "../ui/button";
import MobileNavigation from "./mobile-navigation";

export default function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl pl-6 md:pr-6">
        <Link href="/" className="flex items-center gap-1">
          <Helzar className="fill-primary" width={20} height={20} />
          <p className="bg-gradient-to-r from-primary to-text bg-clip-text font-extrabold text-transparent text-xl">
            Helzar
          </p>
        </Link>

        <nav className="flex font-medium max-md:hidden">
          <Link href="#" className="p-2">
            Features
          </Link>
          <Link href="#" className="p-2">
            Pricing
          </Link>
          <Link href="#" className="p-2">
            Docs
          </Link>
        </nav>
        <div className="flex items-center">
          <div className="flex gap-2">
            <Link
              href="/login"
              className={buttonStyles({
                color: "secondary",
                variant: "subtle",
                size: "sm",
              })}
            >
              Log in
            </Link>
            <Link href="/signup" className={buttonStyles({ size: "sm" })}>
              Sign up
            </Link>
          </div>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
