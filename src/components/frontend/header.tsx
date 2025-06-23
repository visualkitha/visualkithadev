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
  const navPages = pages.filter(p => !['home', 'contact-us', 'about-us', 'portfolio'].includes(p.slug));

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img//de0c7ccc-e5a4-4b01-8faa-0fad21eddfe0.jpg";

  return (
    <header className="bg-black text-primary-foreground fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoUrl} alt="Visual Kitha Logo" width={40} height={40} className="rounded-full" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-primary-foreground/80">
            Beranda
          </Link>
          <Link href="/products" className="transition-colors hover:text-primary-foreground/80">
            Layanan
          </Link>
          <Link href="/news" className="transition-colors hover:text-primary-foreground/80">
            Berita
          </Link>
          {navPages.map((page) => (
            <Link key={page.id} href={`/${page.slug}`} className="transition-colors hover:text-primary-foreground/80">
              {page.title}
            </Link>
          ))}
          <Link href="/contact-us" className="transition-colors hover:text-primary-foreground/80">
            Hubungi Kami
          </Link>
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-gray-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-primary-foreground border-r border-r-gray-800">
              <Link href="/" className="flex items-center gap-2 mb-8" onClick={closeMobileMenu}>
                <Image src={logoUrl} alt="Visual Kitha Logo" width={40} height={40} className="rounded-full" />
              </Link>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="transition-colors hover:text-primary-foreground/80" onClick={closeMobileMenu}>Beranda</Link>
                <Link href="/products" className="transition-colors hover:text-primary-foreground/80" onClick={closeMobileMenu}>Layanan</Link>
                <Link href="/news" className="transition-colors hover:text-primary-foreground/80" onClick={closeMobileMenu}>Berita</Link>
                {navPages.map((page) => (
                  <Link key={page.id} href={`/${page.slug}`} className="transition-colors hover:text-primary-foreground/80" onClick={closeMobileMenu}>
                    {page.title}
                  </Link>
                ))}
                <Link href="/contact-us" className="transition-colors hover:text-primary-foreground/80" onClick={closeMobileMenu}>Hubungi Kami</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
