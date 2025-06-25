import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const logoUrl = "https://itoizdelnicxhqadarbo.supabase.co/storage/v1/object/sign/img/IMG_1090.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kM2QwMjc5Yi04NjlkLTQxNjQtODI3OS04ZTJiNTVjNjZhYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWcvSU1HXzEwOTAuanBnIiwiaWF0IjoxNzUwODU5MDg4LCJleHAiOjE3ODIzOTUwODh9.rwKNivhMSvM7QABznOIJ48i--0LtC7MPEEMfHkp1PnA";

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
