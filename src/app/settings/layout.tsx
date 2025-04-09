import MobileNavigation from "@/components/settings/mobile-navigation";
import NavLink from "@/components/settings/nav-link";
import { buttonStyles } from "@/components/ui/button";
import { ChevronLeft, KeyRound, SlidersHorizontal, User } from "lucide-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 flex w-60 flex-col gap-6 bg-surface px-3 py-6 max-lg:hidden">
        <Link
          href="/"
          className={buttonStyles({
            color: "secondary",
            size: "sm",
            variant: "subtle",
            className: "w-fit text-text-2 hover:text-text",
          })}
        >
          <ChevronLeft />
          Back to app
        </Link>
        <nav className="flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <p className="px-3 font-medium text-text-2">General</p>
            <div className="flex flex-col">
              <NavLink
                href="/settings/preferences"
                icon={<SlidersHorizontal />}
              >
                Preferences
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="px-3 font-medium text-text-2">Account</p>
            <div className="flex flex-col">
              <NavLink href="/settings/profile" icon={<User />}>
                Profile
              </NavLink>
              <NavLink href="/settings/security" icon={<KeyRound />}>
                Security & access
              </NavLink>
            </div>
          </div>
        </nav>
      </aside>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-surface/80 backdrop-blur-xl lg:hidden">
        <div className="flex items-center">
          <Link
            href={"/"}
            className="flex size-16 items-center justify-center text-text-2"
          >
            <ChevronLeft size={18} />
          </Link>
          <h1 className="font-medium text-base">Settings</h1>
        </div>
        <MobileNavigation />
      </header>
      <main className="min-h-[calc(100vh-4rem)] bg-bg px-6 py-6 max-lg:mt-16 sm:py-16 lg:ml-60 lg:min-h-screen">
        {children}
      </main>
    </>
  );
}
