"use client";

import { Dialog } from "@base-ui-components/react";
import Link from "next/link";
import { useState } from "react";
import MenuAnimatedIcon from "../../../public/menu-animated";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        className="group flex size-16 cursor-pointer items-center justify-center text-text-2"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <MenuAnimatedIcon height={16} width={16} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="fixed inset-x-0 top-16 z-50 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto bg-surface/80 text-text backdrop-blur-xl transition-all duration-200 ease-initial data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 lg:hidden">
          <nav className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-text-2">General</p>
              <div className="flex flex-col pl-3">
                <Link
                  href="/settings/preferences"
                  className="py-2 font-medium text-text"
                  onClick={() => setIsOpen(false)}
                >
                  Preferences
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-text-2">Account</p>
              <div className="flex flex-col pl-3">
                <Link
                  href="/settings/profile"
                  className="py-2 font-medium text-text"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings/security"
                  className="py-2 font-medium text-text"
                  onClick={() => setIsOpen(false)}
                >
                  Security & access
                </Link>
              </div>
            </div>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
