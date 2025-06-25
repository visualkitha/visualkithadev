'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import type { Page } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import Image from 'next/image';
import { ThemeToggle } from '../theme-toggle';

export function Header({ pages }: { pages: Page[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter out pages that have hardcoded links to avoid duplicates
  const navPages = pages.filter(p => !['home', 'contact-us', 'about-us', 'news'].includes(p.slug));

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const logoUrl = "https://itoizdelnicxhqadarbo.supabase.co/storage/v1/object/sign/img/IMG_1090.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kM2QwMjc5Yi04NjlkLTQxNjQtODI3OS04ZTJiNTVjNjZhYjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWcvSU1HXzEwOTAuanBnIiwiaWF0IjoxNzUwODU5MDg4LCJleHAiOjE3ODIzOTUwODh9.rwKNivhMSvM7QABznOIJ48i--0LtC7MPEEMfHkp1PnA";

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground fixed top-0 left-0 right-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Image src={logoUrl} alt="Visual Kitha Logo" width={40} height={40} className="rounded-full" />
          <span className='hidden sm:inline'>Visual Kitha</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            Beranda
          </Link>
           <Link href="/about-us" className="transition-colors hover:text-primary">
            Tentang Kami
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
        <div className="flex items-center gap-2">
            <div className="hidden md:block">
                <ThemeToggle />
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Buka menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <Link href="/" className="flex items-center gap-2 mb-8 font-bold text-lg" onClick={closeMobileMenu}>
                    <Image src={logoUrl} alt="Visual Kitha Logo" width={40} height={40} className="rounded-full" />
                    <span>Visual Kitha</span>
                </Link>
                <nav className="grid gap-6 text-lg font-medium">
                    <Link href="/" className="transition-colors hover:text-primary" onClick={closeMobileMenu}>Beranda</Link>
                    <Link href="/about-us" className="transition-colors hover:text-primary" onClick={closeMobileMenu}>Tentang Kami</Link>
                    <Link href="/products" className="transition-colors hover:text-primary" onClick={closeMobileMenu}>Layanan</Link>
                    <Link href="/news" className="transition-colors hover:text-primary" onClick={closeMobileMenu}>Berita</Link>
                    {navPages.map((page) => (
                    <Link key={page.id} href={`/${page.slug}`} className="transition-colors hover:text-primary" onClick={closeMobileMenu}>
                        {page.title}
                    </Link>
                    ))}
                    <Link href="/contact-us" className="transition-colors hover:text-primary" onClick={closeMobileMenu}>Hubungi Kami</Link>
                </nav>
                <div className='mt-8'>
                    <ThemeToggle />
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
