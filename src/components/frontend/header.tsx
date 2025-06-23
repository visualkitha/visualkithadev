'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import type { Page } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import Image from 'next/image';

export function Header({ pages }: { pages: Page[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter out pages that have hardcoded links to avoid duplicates
  const navPages = pages.filter(p => !['home', 'contact-us'].includes(p.slug));

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img//WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg";

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoUrl} alt="Visual Kitha Logo" width={40} height={40} className="rounded-full" />
          <span className="font-headline text-lg font-bold">Visual Kitha</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            Beranda
          </Link>
          <Link href="/products" className="transition-colors hover:text-primary">
            Layanan
          </Link>
          <Link href="/news" className="transition-colors hover:text-primary">
            Berita
          </Link>
          {navPages.map((page) => (
            <Link key={page.id} href={`/${page.slug}`} className="transition-colors hover:text-primary">
              {page.title}
            </Link>
          ))}
          <Link href="/contact-us" className="transition-colors hover:text-primary">
            Hubungi Kami
          </Link>
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="flex items-center gap-2 mb-8" onClick={closeMobileMenu}>
                <Image src={logoUrl} alt="Visual Kitha Logo" width={40} height={40} className="rounded-full" />
                <span className="font-headline text-lg font-bold text-foreground">Visual Kitha</span>
              </Link>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="text-foreground transition-colors hover:text-primary" onClick={closeMobileMenu}>Beranda</Link>
                <Link href="/products" className="text-foreground transition-colors hover:text-primary" onClick={closeMobileMenu}>Layanan</Link>
                <Link href="/news" className="text-foreground transition-colors hover:text-primary" onClick={closeMobileMenu}>Berita</Link>
                {navPages.map((page) => (
                  <Link key={page.id} href={`/${page.slug}`} className="text-foreground transition-colors hover:text-primary" onClick={closeMobileMenu}>
                    {page.title}
                  </Link>
                ))}
                <Link href="/contact-us" className="text-foreground transition-colors hover:text-primary" onClick={closeMobileMenu}>Hubungi Kami</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
