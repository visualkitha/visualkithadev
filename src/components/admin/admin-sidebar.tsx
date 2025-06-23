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

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/admin/equipment', label: 'Peralatan', icon: Package },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/blog/categories', label: 'Kategori Blog', icon: Tags },
  { href: '/admin/pages', label: 'Halaman', icon: FileText },
  { href: '/admin/site-images', label: 'Gambar Situs', icon: ImageIcon },
];

const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img//WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg";

export function AdminSidebar() {
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
      // Only active if it's the blog page or its children, but not the categories page.
      return pathname.startsWith('/admin/blog') && !pathname.startsWith('/admin/blog/categories');
    }
    // Active if the current path starts with the item's path.
    return pathname.startsWith(itemPath);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex items-center justify-between">
         <div className="flex items-center gap-2">
            <Image src={logoUrl} alt="Visual Kitha Logo" width={32} height={32} className="rounded-full" />
            <span className="font-headline text-lg font-bold">VK CMS</span>
         </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isLinkActive(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip={{children: "Keluar"}}>
              <LogOut />
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
