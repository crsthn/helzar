import Footer from "@/components/global/footer";
import TechLogoGrid from "@/components/global/tech-logo-grid";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Database, Lock, Palette } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section
        id="home"
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 py-24 lg:py-40"
      >
        <div className="flex flex-col items-center gap-6">
          <h1 className="md:text- max-w-lg text-pretty text-center font-bold sm:text-5xl">
            Production-ready template for Next.js
          </h1>
          <p className="max-w-xl text-center text-text-2 text-xl">
            All the tools and configurations you need. Skip the repetitive setup
            and focus on what truly matters.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/signup" className={buttonStyles({ size: "lg" })}>
            Get started
          </Link>
          <Link
            href="/docs"
            className={buttonStyles({ color: "secondary", size: "lg" })}
          >
            Documentation
          </Link>
        </div>
      </section>
      <section className="bg-gradient-to-b from-surface to-bg">
        <div className="mx-auto mb-24 flex w-full max-w-7xl flex-col items-center gap-12 px-6 lg:mb-40">
          <div className="flex flex-col items-center gap-2">
            <h2 className="bg-gradient-to-r from-primary to-text bg-clip-text font-bold text-transparent">
              Stack
            </h2>
            <p className="text-base text-cente text-text-2">
              Built with modern technologies
            </p>
          </div>
          <TechLogoGrid />
        </div>
      </section>
      <section className="bg-bg pb-40">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6">
          <div className="flex flex-col items-center gap-2">
            <h2 className="bg-gradient-to-r from-primary to-text bg-clip-text font-bold text-transparent">
              Features
            </h2>
            <p className="text-base text-cente text-text-2">
              Everything you need to build robust applications
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="group flex flex-col items-center gap-6 p-6">
              <div className="group-hover:-translate-y-5 rounded-full bg-secondary p-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-125 group-hover:bg-primary">
                <Lock
                  size={48}
                  className="transition-colors group-hover:text-on-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>Authentication</h4>
                <p className="text-text-2">
                  Built-in authentication with better-auth. Support for
                  email/password, external providers, and OTP.
                </p>
              </div>
            </Card>
            <Card className="group relative flex flex-col items-center gap-6 p-6">
              <div className="group-hover:-translate-y-5 rounded-full bg-secondary p-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-125 group-hover:bg-primary">
                <Database
                  size={48}
                  className="transition-colors group-hover:text-on-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>Database</h4>
                <p className="text-text-2">
                  Drizzle ORM with Neon Database for type-safe database access
                  and serverless PostgreSQL.
                </p>
              </div>
            </Card>
            <Card className="group relative flex flex-col items-center gap-6 p-6">
              <div className="group-hover:-translate-y-5 rounded-full bg-secondary p-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-125 group-hover:bg-primary">
                <Palette
                  size={48}
                  className="transition-colors group-hover:text-on-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>UI Components</h4>
                <p className="text-text-2">
                  Pre-built UI components with base-ui-components. Fully
                  customizable with Tailwind CSS.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
