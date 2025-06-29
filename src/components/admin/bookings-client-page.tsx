
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Booking, Client, CrewMember, InventoryItem } from '@/lib/types';
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
import { PlusCircle, MoreHorizontal, Pencil, Trash2, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
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
import { deleteBooking, saveBooking } from '@/lib/actions';
import { BookingForm, BookingFormValues } from './booking-form';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BookingsClientPageProps {
  initialBookings: Booking[];
  initialClients: Client[];
  initialCrewMembers: CrewMember[];
  initialInventory: InventoryItem[];
}

const statusColorClassMap: { [key in Booking['status']]: string } = {
  Draft: 'bg-gray-500',
  Confirmed: 'bg-blue-500',
  Ongoing: 'bg-yellow-500',
  Completed: 'bg-green-500',
  Cancelled: 'bg-red-500',
};

const paymentStatusColorMap: { [key in Booking['paymentStatus']]: string } = {
  Unpaid: 'bg-red-500',
  'Down Payment': 'bg-yellow-500',
  Paid: 'bg-green-500',
  Refunded: 'bg-gray-500',
};

export function BookingsClientPage({ initialBookings, initialClients, initialCrewMembers, initialInventory }: BookingsClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleOpenDialog = (booking: Booking | null = null) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) return;
    setSelectedBooking(null);
    setIsDialogOpen(false);
  };

  const handleFormSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);

    const selectedClient = initialClients.find(c => c.id === data.clientId);
    if (!selectedClient) {
        toast({ variant: 'destructive', title: 'Error', description: 'Klien yang dipilih tidak valid.' });
        setIsSubmitting(false);
        return;
    }
    
    const result = await saveBooking({
        ...data,
        id: selectedBooking?.id,
        clientName: selectedClient.name, // Ensure client name is passed
    });
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: `Booking telah ${selectedBooking ? 'diperbarui' : 'dibuat'}.`,
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
    const result = await deleteBooking(id);
    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: 'Booking telah dihapus.',
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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Manajemen Booking</h1>
            <p className="text-muted-foreground">Buat dan kelola booking event Anda.</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Booking Baru
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Klien</TableHead>
                  <TableHead>Tanggal Acara</TableHead>
                  <TableHead>Status Booking</TableHead>
                  <TableHead>Status Bayar</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.clientName}</TableCell>
                    <TableCell>
                      {new Date(booking.eventDate).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                       <Badge className={cn(statusColorClassMap[booking.status])}>
                         {booking.status}
                       </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge className={cn(paymentStatusColorMap[booking.paymentStatus])}>
                         {booking.paymentStatus}
                       </Badge>
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
                            <DropdownMenuItem onClick={() => handleOpenDialog(booking)}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                                <Link href={`/admin/invoices/${booking.id}`}>
                                <FileText className="mr-2 h-4 w-4" /> Lihat Faktur
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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
                              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data booking ini secara permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(booking.id)} className="bg-destructive hover:bg-destructive/90">
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
            <DialogTitle className="font-headline">{selectedBooking ? 'Edit Booking' : 'Buat Booking Baru'}</DialogTitle>
            <DialogDescription>
              {selectedBooking ? 'Perbarui detail untuk booking ini.' : 'Isi detail untuk booking baru.'}
            </DialogDescription>
          </DialogHeader>
           <ScrollArea className="h-[70vh] -mx-6 px-6">
            <div className="py-4 pr-1">
              <BookingForm
                key={selectedBooking?.id || 'new'}
                initialData={selectedBooking}
                clients={initialClients}
                crewMembers={initialCrewMembers}
                inventory={initialInventory}
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
