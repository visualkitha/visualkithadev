'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Page } from '@/lib/types';
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
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Link as LinkIcon } from 'lucide-react';
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
import { PageForm, PageFormValues } from '@/components/admin/page-form';
import { useToast } from '@/hooks/use-toast';
import { deletePage, savePage } from '@/lib/actions';
import Link from 'next/link';

interface PagesClientPageProps {
  initialPages: Page[];
}

export function PagesClientPage({ initialPages }: PagesClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenDialog = (page: Page | null = null) => {
    setSelectedPage(page);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) return;
    setSelectedPage(null);
    setIsDialogOpen(false);
  };

  const handleFormSubmit = async (data: PageFormValues) => {
    setIsSubmitting(true);
    const result = await savePage({ ...data, id: selectedPage?.id });
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: `Halaman telah ${selectedPage ? 'diperbarui' : 'dibuat'}.`,
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
    const result = await deletePage(id);
    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: 'Halaman telah dihapus.',
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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Halaman</h1>
            <p className="text-muted-foreground">Kelola halaman statis situs web Anda.</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Halaman
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Dibuat Pada</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <Link href={`/${page.slug}`} target="_blank" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                        /{page.slug}
                        <LinkIcon className="h-3 w-3" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={page.status === 'Published' ? 'default' : 'secondary'}>
                        {page.status === 'Published' ? 'Diterbitkan' : 'Draf'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(page.createdAt).toLocaleDateString()}
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
                            <DropdownMenuItem onClick={() => handleOpenDialog(page)}>
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
                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus halaman ini secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(page.id)} className="bg-destructive hover:bg-destructive/90">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline">{selectedPage ? 'Edit Halaman' : 'Tambah Halaman Baru'}</DialogTitle>
            <DialogDescription>
              {selectedPage ? 'Perbarui detail untuk halaman ini.' : 'Buat halaman statis baru untuk situs web Anda.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <PageForm
              key={selectedPage?.id || 'new'}
              initialData={selectedPage}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseDialog}
              isSubmitting={isSubmitting}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
