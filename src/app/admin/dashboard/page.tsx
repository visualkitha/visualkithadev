
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Package, FileText, Newspaper, CalendarCheck } from 'lucide-react';
import { fetchEquipment, fetchPages, fetchBlogPosts, fetchBookings } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Ambil data secara paralel
  const [equipment, pages, blogPosts, bookings] = await Promise.all([
    fetchEquipment(),
    fetchPages({ includeDrafts: true }),
    fetchBlogPosts({ includeDrafts: true }),
    fetchBookings(),
  ]);

  const stats = [
    { title: 'Total Booking', value: bookings.length, icon: CalendarCheck, description: 'Total booking yang dikelola', href: '/admin/bookings' },
    { title: 'Peralatan', value: equipment.length, icon: Package, description: 'Total produk yang dikelola', href: '/admin/equipment' },
    { title: 'Halaman', value: pages.length, icon: FileText, description: 'Total halaman statis', href: '/admin/pages' },
    { title: 'Postingan Blog', value: blogPosts.length, icon: Newspaper, description: 'Total artikel (draf & terbit)', href: '/admin/blog' },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Dasbor Admin</h1>
        <p className="text-muted-foreground">
          Gambaran umum tentang konten dan aktivitas situs web Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-body">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

       <Card>
          <CardHeader>
            <CardTitle className="font-headline">Booking Terbaru</CardTitle>
            <CardDescription>5 booking yang baru saja dibuat atau diperbarui.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             {recentBookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Klien</TableHead>
                      <TableHead>Jenis Acara</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell text-right">Tanggal Acara</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                       <TableRow key={booking.id}>
                         <TableCell className="font-medium">
                           <Link href={`/admin/bookings`} className="hover:underline">
                            {booking.clientName}
                           </Link>
                         </TableCell>
                         <TableCell>{booking.eventType}</TableCell>
                         <TableCell>
                           <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                              {booking.status}
                           </Badge>
                         </TableCell>
                         <TableCell className="hidden md:table-cell text-right">
                           {new Date(booking.eventDate).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                           })}
                         </TableCell>
                       </TableRow>
                    ))}
                  </TableBody>
                </Table>
             ) : (
                <div className="p-6">
                  <p className="text-sm text-muted-foreground">Tidak ada booking terbaru untuk ditampilkan.</p>
                </div>
             )}
          </CardContent>
        </Card>
    </div>
  );
}
