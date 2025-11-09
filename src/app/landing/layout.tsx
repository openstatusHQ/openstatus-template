import { Footer } from "@/content/footer";
import { Header } from "@/content/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-4 mx-auto max-w-4xl font-mono">
      <Header />
      <main className="flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
