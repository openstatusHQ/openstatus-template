import { Link } from "@/components/common/link";
import { GitHubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col gap-16 justify-center items-center">
        <div className="flex flex-col items-center gap-2 p-4">
          <Badge variant="secondary">Coming to OpenStatus</Badge>
          <h1 className="text-center text-2xl sm:text-3xl font-bold max-w-xl">
            Welcome to the OpenStatus-Template
          </h1>
          <p className="text-foreground/70 text-sm sm:text-base text-center max-w-[38rem]">
            We&apos;ve created this template to help you get started with your{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @shadcn/ui
            </Link>{" "}
            project. It uses{" "}
            <Link
              href="https://nextjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @nextjs
            </Link>{" "}
            in an SPA mode and can be exported statically{" "}
            <span className="text-foreground font-medium">(BYO router)</span>.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <NextLink
              href="https://github.com/openstatusHQ/openstatus-template"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </NextLink>
          </Button>
          <Button size="sm" asChild>
            <NextLink href="/dashboard/onboarding">Dashboard</NextLink>
          </Button>
        </div>
      </main>
      <footer>
        <p className="text-foreground/70 text-center p-4 border-t border-border">
          Powered by{" "}
          <Link
            href="https://openstatus.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStatus
          </Link>
        </p>
      </footer>
    </div>
  );
}
