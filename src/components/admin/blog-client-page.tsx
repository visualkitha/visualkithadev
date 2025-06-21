'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { deleteBlogPost, saveBlogPost } from '@/lib/actions';
import { BlogForm, BlogFormValues } from './blog-form';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlogClientPageProps {
  initialPosts: BlogPost[];
}

export function BlogClientPage({ initialPosts }: BlogClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleOpenDialog = (post: BlogPost | null = null) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) return;
    setSelectedPost(null);
    setIsDialogOpen(false);
  };

  const handleFormSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    const result = await saveBlogPost({ ...data, id: selectedPost?.id });
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: `Postingan telah ${selectedPost ? 'diperbarui' : 'dibuat'}.`,
      });
      router.refresh();
      handleCloseDialog();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteBlogPost(id);
    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: 'Postingan telah dihapus.',
      });
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-headline text-3xl font-bold tracking-tight">Postingan Blog</h1>
            <p className="text-muted-foreground">Buat dan kelola konten blog Anda.</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
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
                {initialPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'Published' ? 'default' : 'secondary'}>
                        {post.status === 'Published' ? 'Diterbitkan' : 'Draf'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenDialog(post)}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                <Trash2 className="mr-2 h-4 w-4" /> Hapus
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus postingan ini secara permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-destructive hover:bg-destructive/90">
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-headline">{selectedPost ? 'Edit Postingan' : 'Buat Postingan Baru'}</DialogTitle>
            <DialogDescription>
              {selectedPost ? 'Perbarui detail untuk postingan ini.' : 'Tulis artikel baru untuk blog Anda.'}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh]">
            <div className="py-4 pr-6">
              <BlogForm
                key={selectedPost?.id || 'new'}
                initialData={selectedPost}
                onSubmit={handleFormSubmit}
                onCancel={handleCloseDialog}
                isSubmitting={isSubmitting}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
