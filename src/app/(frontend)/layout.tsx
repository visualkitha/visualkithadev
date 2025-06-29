import { Footer } from "@/components/frontend/footer";
import { Header } from "@/components/frontend/header";
import { fetchPages, fetchSiteImages } from "@/lib/data";
import { FloatingWhatsAppButton } from "@/components/frontend/floating-whatsapp-button";

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await fetchPages();
  const siteSettings = await fetchSiteImages();

  return (
    <div className="flex min-h-screen flex-col">
      <Header pages={pages} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <FloatingWhatsAppButton
        phoneNumber={siteSettings.whatsAppNumber || ''}
        defaultMessage={siteSettings.whatsAppDefaultMessage || ''}
      />
    </div>
  );
}
