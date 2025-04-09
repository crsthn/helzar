import Link from "next/link";
import Helzar from "../../../public/helzar";
import { ThemeToggle } from "../theme/theme-toggle";

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-screen-xl justify-between gap-6 px-6 py-14">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Helzar className="fill-primary" height={20} width={20} />
          <span className="bg-gradient-to-r from-primary to-text bg-clip-text font-extrabold text-transparent text-xl">
            Helzar
          </span>
        </div>
        <span className="text-sm text-text-2">
          Built by{" "}
          <Link
            target="_blank"
            href="https://github.com/crsthn77"
            className="font-semibold text-text"
          >
            Cristhian Rodríguez
          </Link>
        </span>
      </div>

      <ThemeToggle />
    </footer>
  );
}
