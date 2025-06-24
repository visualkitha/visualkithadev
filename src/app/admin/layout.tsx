'use client';

import { useState } from 'react';
import { AdminNav, AdminSidebar } from '@/components/admin/admin-sidebar';
import { AuthGuard } from '@/components/admin/auth-guard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const logoUrl =
  'https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn("grid min-h-screen w-full transition-all duration-200", isCollapsed ? 'md:grid-cols-[56px_1fr]' : 'md:grid-cols-[256px_1fr]')}>
      <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka menu navigasi</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-64">
              <AdminNav isCollapsed={false} />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 font-bold"
            >
              <Image
                src={logoUrl}
                alt="Visual Kitha Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>VK CMS</span>
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>
    </div>
  );
}
