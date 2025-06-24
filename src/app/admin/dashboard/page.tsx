
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Package, Newspaper, CalendarCheck, Users, HardHat, Bell, AlertTriangle } from 'lucide-react';
import { fetchInventory, fetchPages, fetchBlogPosts, fetchBookings, fetchClients, fetchCrewMembers } from '@/lib/data';
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
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  // Ambil data secara paralel
  const [inventory, pages, blogPosts, bookings, clients, crew] = await Promise.all([
    fetchInventory(),
    fetchPages({ includeDrafts: true }),
    fetchBlogPosts({ includeDrafts: true }),
    fetchBookings(),
    fetchClients(),
    fetchCrewMembers(),
  ]);

  const stats = [
    { title: 'Total Klien', value: clients.length, icon: Users, description: 'Total klien yang dikelola', href: '/admin/clients' },
    { title: 'Total Booking', value: bookings.length, icon: CalendarCheck, description: 'Total booking yang dikelola', href: '/admin/bookings' },
    { title: 'Anggota Tim', value: crew.length, icon: HardHat, description: 'Total anggota tim teknis', href: '/admin/crew' },
    { title: 'Total Inventaris', value: inventory.length, icon: Package, description: 'Total item yang dikelola', href: '/admin/inventory' },
    { title: 'Postingan Blog', value: blogPosts.length, icon: Newspaper, description: 'Total artikel (draf & terbit)', href: '/admin/blog' },
  ];

  const recentBookings = bookings.slice(0, 5);
  const recentClients = clients.slice(0, 5);

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcomingEvents = bookings.filter(b => {
    const eventDate = new Date(b.eventDate);
    return eventDate >= now && eventDate <= sevenDaysFromNow && b.status !== 'Cancelled';
  }).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  const pendingPayments = bookings.filter(b => 
    (b.paymentStatus === 'Unpaid' || b.paymentStatus === 'Down Payment') && b.status !== 'Cancelled'
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Dasbor Admin</h1>
        <p className="text-muted-foreground">
          Gambaran umum tentang konten dan aktivitas situs web Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

      <div className="grid gap-6 mt-6 md:grid-cols-2">
         <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline">Event Mendatang (7 Hari)</CardTitle>
              </div>
              <CardDescription>Event yang dijadwalkan akan segera berlangsung.</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingEvents.map(event => (
                    <li key={event.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-semibold">{event.clientName}</p>
                        <p className="text-muted-foreground">{event.eventType}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Date(event.eventDate).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </p>
                        <Badge variant="secondary">{event.status}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Tidak ada event yang akan datang dalam 7 hari.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle className="font-headline">Pembayaran Tertunda</CardTitle>
              </div>
              <CardDescription>Booking yang memerlukan tindak lanjut pembayaran.</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingPayments.length > 0 ? (
                <ul className="space-y-3">
                  {pendingPayments.map(booking => (
                     <li key={booking.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-semibold">{booking.clientName}</p>
                         <p className="text-muted-foreground">
                          {new Date(booking.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                         </p>
                      </div>
                       <div className="text-right">
                        <p className="font-medium text-destructive">
                           {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format((booking.totalAmount || 0) - (booking.amountPaid || 0))}
                        </p>
                        <Badge variant="destructive">{booking.paymentStatus}</Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                 <p className="text-sm text-muted-foreground text-center py-4">Tidak ada pembayaran yang tertunda.</p>
              )}
            </CardContent>
          </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
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
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Tanggal Acara</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">
                            <Button variant="link" asChild className="p-0 h-auto">
                              <Link href={`/admin/bookings`}>
                                {booking.clientName}
                              </Link>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                                {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
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

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Klien Terbaru</CardTitle>
              <CardDescription>5 klien yang baru saja ditambahkan.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {recentClients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Klien</TableHead>
                        <TableHead>Kontak</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">
                            <Button variant="link" asChild className="p-0 h-auto">
                              <Link href={`/admin/clients`}>
                                {client.name}
                              </Link>
                            </Button>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{client.contactEmail || client.contactPhone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              ) : (
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">Tidak ada klien terbaru untuk ditampilkan.</p>
                  </div>
              )}
            </CardContent>
          </Card>
      </div>

    </div>
  );
}
