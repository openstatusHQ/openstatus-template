import { Footer } from "@/content/footer";
import { Header } from "@/content/header";
import { CopyLinkButton } from "./copy-link-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-4 mx-auto max-w-5xl font-mono">
      <Header />
      <main className="relative flex-1 px-4 py-8">
        <CopyLinkButton className="absolute top-0 right-4" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
