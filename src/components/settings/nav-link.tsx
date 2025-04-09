"use client";

import { buttonStyles } from "@/components/ui/button";
import { cx } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

export default function NavLink({ href, icon, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={buttonStyles({
        color: "secondary",
        size: "sm",
        variant: "subtle",
        className: cx("justify-start", isActive && "bg-secondary"),
      })}
    >
      {icon}
      {children}
    </Link>
  );
}
