import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg";

export const metadata: Metadata = {
  title: 'Visual Kitha CMS',
  description: 'A modern CMS for Videotron equipment and content management.',
  icons: {
    icon: logoUrl,
    apple: logoUrl,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
