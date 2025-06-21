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
    { title: 'Equipment', value: '6', icon: Package, description: 'Total products managed' },
    { title: 'Pages', value: '4', icon: FileText, description: 'Total static pages' },
    { title: 'Blog Posts', value: '12', icon: Newspaper, description: 'Published articles' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your website's content and activity.
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
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>A log of recent changes across the system.</CardDescription>
          </Header>
          <CardContent>
             <p className="text-sm text-muted-foreground">No recent activity to display.</p>
          </CardContent>
        </Card>
    </div>
  );
}
