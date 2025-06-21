'use client';

import { useState } from 'react';
import type { Equipment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { EquipmentForm } from '@/components/admin/equipment-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


interface EquipmentClientPageProps {
  initialData: Equipment[];
}

export function EquipmentClientPage({ initialData }: EquipmentClientPageProps) {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const handleOpenDialog = (equipment: Equipment | null = null) => {
    setSelectedEquipment(equipment);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedEquipment(null);
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // In a real app, you would handle creating/updating the equipment here
    // and then refetch the list or update the state.
    handleCloseDialog();
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-headline text-3xl font-bold tracking-tight">Equipment</h1>
            <p className="text-muted-foreground">Manage your Videotron equipment catalog.</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipmentList.length > 0 ? (
                  equipmentList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                          data-ai-hint="modem router"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground truncate max-w-sm">{item.description}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenDialog(item)}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No equipment found.
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
              {selectedEquipment ? 'Edit Equipment' : 'Add New Equipment'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the equipment. Use the AI tool to help with descriptions.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <EquipmentForm
              initialData={selectedEquipment}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
