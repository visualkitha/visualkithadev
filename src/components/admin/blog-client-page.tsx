'use client';

import { useState } from 'react';
import type { BlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BlogClientPageProps {
    initialPosts: BlogPost[];
}

export function BlogClientPage({ initialPosts }: BlogClientPageProps) {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="font-headline text-3xl font-bold tracking-tight">Postingan Blog</h1>
                    <p className="text-muted-foreground">Buat dan kelola konten blog Anda.</p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Posting Baru
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead className="hidden md:table-cell">Penulis</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Dibuat Pada</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                            <TableCell>
                                <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                                    {post.status === 'Published' ? 'Diterbitkan' : 'Draf'}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{post.createdAt}</TableCell>
                            <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                    <Trash2 className="mr-2 h-4 w-4" /> Hapus
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline">Buat Postingan Baru</DialogTitle>
                    <DialogDescription>Tulis artikel baru untuk blog Anda.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Judul</Label>
                        <Input id="title" placeholder="Judul postingan blog Anda" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Buat Postingan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
}
