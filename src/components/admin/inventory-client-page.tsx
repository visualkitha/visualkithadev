
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { InventoryItem } from '@/lib/types';
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
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { InventoryForm, InventoryFormValues } from '@/components/admin/inventory-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { deleteInventoryItem, saveInventoryItem } from '@/lib/actions';
import { cn } from '@/lib/utils';

interface InventoryClientPageProps {
  initialData: InventoryItem[];
}

const statusColorMap: Record<InventoryItem['status'], string> = {
  Tersedia: 'bg-green-500',
  Dipinjam: 'bg-yellow-500',
  Maintenance: 'bg-red-500',
};

export function InventoryClientPage({ initialData }: InventoryClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleOpenDialog = (item: InventoryItem | null = null) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) return;
    setSelectedItem(null);
    setIsDialogOpen(false);
  };

  const handleFormSubmit = async (data: InventoryFormValues) => {
    setIsSubmitting(true);
    const result = await saveInventoryItem({ ...data, id: selectedItem?.id });
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: `Item inventaris telah ${selectedItem ? 'diperbarui' : 'dibuat'}.`,
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
    const result = await deleteInventoryItem(id);
    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: 'Item inventaris telah dihapus.',
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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Manajemen Inventaris</h1>
            <p className="text-muted-foreground">Kelola katalog item inventaris Anda.</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Item
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Gambar</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialData.length > 0 ? (
                  initialData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.imageUrl || 'https://placehold.co/40x40.png'}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                          data-ai-hint="equipment item"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge className={cn("text-white", statusColorMap[item.status])}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground truncate max-w-sm">{item.description}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Aksi</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(item)}>
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
                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus item ini secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-destructive hover:bg-destructive/90">
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      Tidak ada item inventaris ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-headline">
              {selectedItem ? 'Edit Item Inventaris' : 'Tambah Item Baru'}
            </DialogTitle>
            <DialogDescription>
              Isi detail untuk item inventaris. Gunakan alat AI untuk membantu dengan deskripsi.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <InventoryForm
              key={selectedItem?.id || 'new'}
              initialData={selectedItem}
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
