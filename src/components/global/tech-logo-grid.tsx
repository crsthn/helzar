import type React from "react";
import BaseUI from "../../../public/base-ui";
import BetterAuth from "../../../public/better-auth";
import DrizzleORM from "../../../public/drizzle";
import Nextjs from "../../../public/nextjs";
import TailwindCSS from "../../../public/tailwind";
import TypeScript from "../../../public/typescript";

type LogoInfo = {
  id: string;
  name: string;
  Logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hoverColor: string;
};

const logos: LogoInfo[] = [
  { id: "nextjs", name: "Next.js", Logo: Nextjs, hoverColor: "white" },
  {
    id: "typescript",
    name: "TypeScript",
    Logo: TypeScript,
    hoverColor: "#3178C6",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    Logo: TailwindCSS,
    hoverColor: "#38BDF8",
  },
  {
    id: "betterauth",
    name: "Better Auth",
    Logo: BetterAuth,
    hoverColor: "#FF4785",
  },
  {
    id: "drizzle",
    name: "Drizzle ORM",
    Logo: DrizzleORM,
    hoverColor: "#C5F74F",
  },
  {
    id: "baseui",
    name: "Base UI",
    Logo: BaseUI,
    hoverColor: "#333333",
  },
];

export default function TechLogoGrid() {
  return (
    <div className="grid w-full grid-cols-2 gap-px bg-border p-px md:grid-cols-3 lg:grid-cols-6">
      {logos.map((logo) => {
        return (
          <div
            key={logo.id}
            className="group relative flex aspect-4/3 select-none flex-col items-center justify-center gap-2 overflow-hidden bg-surface"
          >
            <div className="-translate-y-full absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-y-full group-hover:opacity-100 dark:via-primary/30" />

            <logo.Logo className="size-11 translate-y-3.5 fill-text transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 [@media(hover:none)]:translate-y-0" />
            <span className="font-medium opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:delay-75 [@media(hover:none)]:opacity-100">
              {logo.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
