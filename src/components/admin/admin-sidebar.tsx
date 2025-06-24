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
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  Settings,
  Users,
  CalendarDays,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';


const navItems = [
  { href: '/admin/dashboard', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/admin/schedule', label: 'Kalender Jadwal', icon: CalendarDays },
  { href: '/admin/bookings', label: 'Manajemen Booking', icon: CalendarCheck },
  { href: '/admin/clients', label: 'Manajemen Klien', icon: Users },
  { href: '/admin/equipment', label: 'Peralatan', icon: Package },
  { 
    label: 'Manajemen Situs', 
    icon: Settings,
    subItems: [
      { href: '/admin/blog', label: 'Blog', icon: Newspaper },
      { href: '/admin/blog/categories', label: 'Kategori Blog', icon: Tags },
      { href: '/admin/pages', label: 'Halaman', icon: FileText },
      { href: '/admin/site-images', label: 'Gambar Situs', icon: ImageIcon },
    ]
  },
];

const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg";

interface AdminNavProps {
  isCollapsed: boolean;
}

export function AdminNav({ isCollapsed }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/login');
  };

  const isLinkActive = (href: string) => {
    // Special handling for blog pages to avoid conflict with categories
    if (href === '/admin/blog') {
      return pathname.startsWith('/admin/blog') && !pathname.startsWith('/admin/blog/categories');
    }
    return pathname.startsWith(href);
  };
  
  const isGroupActive = (subItems: any[]) => {
      return subItems.some(item => isLinkActive(item.href));
  }
  
  const activeGroupValue = navItems.find(item => item.subItems && isGroupActive(item.subItems))?.label;

  return (
    <TooltipProvider delayDuration={0}>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <Image src={logoUrl} alt="Visual Kitha Logo" width={32} height={32} className="rounded-full" />
              <span className={cn("transition-all", isCollapsed && "w-0 opacity-0")}>VK CMS</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <Accordion type="multiple" defaultValue={activeGroupValue ? [activeGroupValue] : []} asChild>
                <nav className={cn("grid items-start text-sm font-medium", isCollapsed ? "justify-center px-2 gap-1" : "px-4")}>
                {navItems.map((item) => 
                    item.subItems ? (
                        <div key={item.label}>
                            {isCollapsed ? (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant={isGroupActive(item.subItems) ? 'muted' : 'ghost'}
                                                    size="icon"
                                                    className="h-9 w-9 md:h-8 md:w-8"
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span className="sr-only">{item.label}</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">{item.label}</TooltipContent>
                                        </Tooltip>
                                    </PopoverTrigger>
                                    <PopoverContent side="right" align="start" className="flex flex-col gap-1 p-1 w-48 bg-background">
                                        <p className='p-2 text-sm font-semibold'>{item.label}</p>
                                        {item.subItems.map(subItem => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
                                                    isLinkActive(subItem.href) && 'bg-muted font-semibold text-primary'
                                                )}
                                            >
                                                <subItem.icon className="h-4 w-4" />
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <AccordionItem value={item.label} className="border-b-0">
                                    <AccordionTrigger className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all justify-start hover:text-primary hover:no-underline [&[data-state=open]>svg.lucide-chevron-down]:rotate-180",
                                        isGroupActive(item.subItems) && 'text-primary bg-muted'
                                    )}>
                                        <item.icon className="h-4 w-4" />
                                        <span className='flex-1 text-left'>{item.label}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-8 pt-1 pb-0 mt-1 space-y-1">
                                        {item.subItems.map(subItem => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                                    isLinkActive(subItem.href) && 'bg-muted text-primary'
                                                )}
                                            >
                                                <subItem.icon className="h-4 w-4" /> 
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                        </div>
                    ) : (
                        isCollapsed ? (
                            <Tooltip key={item.href}>
                                <TooltipTrigger asChild>
                                    <Link
                                    href={item.href!}
                                    className={cn(
                                        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary md:h-8 md:w-8',
                                        isLinkActive(item.href!) && 'bg-muted text-primary'
                                    )}
                                    >
                                    <item.icon className="h-5 w-5" />
                                    <span className="sr-only">{item.label}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{item.label}</TooltipContent>
                            </Tooltip>
                        ) : (
                             <Link
                                key={item.href}
                                href={item.href!}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                    isLinkActive(item.href!) && 'bg-muted text-primary'
                                )}
                                >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                             </Link>
                        )
                    )
                )}
                </nav>
            </Accordion>
          </div>
          <div className="mt-auto p-4 border-t">
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="w-full" size="icon" onClick={handleLogout}>
                      <LogOut className="h-5 w-5" />
                      <span className="sr-only">Keluar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Keluar</TooltipContent>
              </Tooltip>
            ) : (
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </Button>
            )}
          </div>
        </div>
    </TooltipProvider>
  );
}

export function AdminSidebar({ isCollapsed, toggleSidebar }: { isCollapsed: boolean, toggleSidebar: () => void }) {
  return (
    <aside className="hidden border-r bg-background md:flex md:flex-col relative">
      <AdminNav isCollapsed={isCollapsed} />
       <Button variant="outline" size="icon" className="absolute top-1/2 -right-5 transform -translate-y-1/2 rounded-full h-8 w-8" onClick={toggleSidebar}>
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        <span className="sr-only">{isCollapsed ? 'Buka sidebar' : 'Tutup sidebar'}</span>
      </Button>
    </aside>
  );
}
