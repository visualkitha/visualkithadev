
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Package, FileText, Newspaper } from 'lucide-react';
import { fetchEquipment, fetchPages, fetchBlogPosts } from '@/lib/data';
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
  const [equipment, pages, blogPosts] = await Promise.all([
    fetchEquipment(),
    fetchPages({ includeDrafts: true }),
    fetchBlogPosts({ includeDrafts: true }),
  ]);

  const stats = [
    { title: 'Peralatan', value: equipment.length, icon: Package, description: 'Total produk yang dikelola' },
    { title: 'Halaman', value: pages.length, icon: FileText, description: 'Total halaman statis' },
    { title: 'Postingan Blog', value: blogPosts.length, icon: Newspaper, description: 'Total artikel (draf & terbit)' },
  ];

  const recentBlogPosts = blogPosts.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Dasbor Admin</h1>
        <p className="text-muted-foreground">
          Gambaran umum tentang konten dan aktivitas situs web Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-body">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card>
          <CardHeader>
            <CardTitle className="font-headline">Aktivitas Blog Terbaru</CardTitle>
            <CardDescription>5 postingan blog yang baru saja dibuat atau diperbarui.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             {recentBlogPosts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell text-right">Tanggal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBlogPosts.map((post) => (
                       <TableRow key={post.id}>
                         <TableCell className="font-medium">
                           <Link href={`/admin/blog`} className="hover:underline">
                            {post.title}
                           </Link>
                         </TableCell>
                         <TableCell>
                           <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                              {post.status === 'Published' ? 'Diterbitkan' : 'Draf'}
                           </Badge>
                         </TableCell>
                         <TableCell className="hidden md:table-cell text-right">
                           {new Date(post.createdAt).toLocaleDateString('id-ID', {
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
                  <p className="text-sm text-muted-foreground">Tidak ada aktivitas terbaru untuk ditampilkan.</p>
                </div>
             )}
          </CardContent>
        </Card>
    </div>
  );
}
