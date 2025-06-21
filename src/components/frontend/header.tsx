'use client';

import Link from 'next/link';
import { Tv2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/80 fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Tv2 className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Visual Kitha CMS</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/news" className="transition-colors hover:text-primary">
            News
          </Link>
          <Link href="/login" className="transition-colors hover:text-primary">
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
