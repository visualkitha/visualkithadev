import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Package, FileText, Newspaper } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Peralatan', value: '6', icon: Package, description: 'Total produk yang dikelola' },
    { title: 'Halaman', value: '4', icon: FileText, description: 'Total halaman statis' },
    { title: 'Postingan Blog', value: '12', icon: Newspaper, description: 'Artikel yang dipublikasikan' },
  ];

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
            <CardTitle className="font-headline">Aktivitas Terbaru</CardTitle>
            <CardDescription>Catatan perubahan terbaru di seluruh sistem.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">Tidak ada aktivitas terbaru untuk ditampilkan.</p>
          </CardContent>
        </Card>
    </div>
  );
}
