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
        className="group flex size-16 cursor-pointer items-center justify-center text-text-2 md:hidden"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <MenuAnimatedIcon height={16} width={16} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="fixed inset-x-0 top-16 z-50 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto bg-surface/80 text-text backdrop-blur-xl transition-all duration-200 ease-initial data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 md:hidden">
          <nav className="flex flex-col gap-3 p-6 font-medium text-2xl">
            <Link
              href="#"
              className="font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/"
              className="font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              Changelogs
            </Link>
            <Link
              href="/"
              className="font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/"
              className="font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/"
              className="font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
