'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  LayoutDashboard,
  Package,
  Newspaper,
  LogOut,
  FileText,
  Tags,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/admin/equipment', label: 'Peralatan', icon: Package },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/blog/categories', label: 'Kategori Blog', icon: Tags },
  { href: '/admin/pages', label: 'Halaman', icon: FileText },
  { href: '/admin/site-images', label: 'Gambar Situs', icon: ImageIcon },
];

const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg";


export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/login');
  };

  const isLinkActive = (itemPath: string) => {
    if (itemPath === '/admin/blog') {
      return pathname.startsWith('/admin/blog') && !pathname.startsWith('/admin/blog/categories');
    }
    return pathname.startsWith(itemPath);
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          <Image src={logoUrl} alt="Visual Kitha Logo" width={32} height={32} className="rounded-full" />
          <span className="">VK CMS</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                isLinkActive(item.href) && 'bg-muted text-primary'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </div>
    </div>
  );
}


export function AdminSidebar() {
  return (
    <aside className="hidden border-r bg-background md:block">
      <AdminNav />
    </aside>
  );
}
