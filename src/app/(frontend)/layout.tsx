import { Footer } from "@/components/frontend/footer";
import { Header } from "@/components/frontend/header";
import { fetchPages } from "@/lib/data";

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await fetchPages();

  return (
    <div className="flex min-h-screen flex-col">
      <Header pages={pages} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
