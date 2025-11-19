import { Footer } from "@/content/footer";
import { Header } from "@/content/header";
import { SubNav } from "@/content/sub-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-4 mx-auto max-w-5xl font-mono">
      <Header />
      <SubNav />
      <main className="flex-1 px-4">{children}</main>
      <Footer />
    </div>
  );
}
