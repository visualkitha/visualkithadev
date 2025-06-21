'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { BlogCategory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { deleteBlogCategory, saveBlogCategory } from '@/lib/actions';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { PlusCircle, MoreHorizontal, Pencil, Trash2, CornerUpLeft } from 'lucide-react';
import { CategoryForm, CategoryFormValues } from './category-form';

interface CategoriesClientPageProps {
  initialCategories: BlogCategory[];
}

export function CategoriesClientPage({ initialCategories }: CategoriesClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);

  const handleOpenDialog = (category: BlogCategory | null = null) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) return;
    setSelectedCategory(null);
    setIsDialogOpen(false);
  };

  const handleFormSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    const result = await saveBlogCategory({ ...data, id: selectedCategory?.id });
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: `Kategori telah ${selectedCategory ? 'diperbarui' : 'dibuat'}.`,
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
    const result = await deleteBlogCategory(id);
    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: 'Kategori telah dihapus.',
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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Kategori Blog</h1>
            <p className="text-muted-foreground">Buat dan kelola kategori untuk postingan blog Anda.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/blog">
                <CornerUpLeft className="mr-2 h-4 w-4" />
                Kembali ke Blog
              </Link>
            </Button>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Kategori
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialCategories.length > 0 ? (
                  initialCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(category)}>
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
                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus kategori ini secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-destructive hover:bg-destructive/90">
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      Tidak ada kategori ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline">{selectedCategory ? 'Edit Kategori' : 'Buat Kategori Baru'}</DialogTitle>
            <DialogDescription>
              {selectedCategory ? 'Perbarui nama untuk kategori ini.' : 'Buat kategori baru untuk postingan Anda.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <CategoryForm
              key={selectedCategory?.id || 'new'}
              initialData={selectedCategory}
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
