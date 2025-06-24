'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';
import type { Client } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, 'Nama klien harus minimal 2 karakter.'),
  company: z.string().optional(),
  contactEmail: z.string().email('Format email tidak valid.').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  initialData?: Client | null;
  onSubmit: (data: ClientFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ClientForm({ initialData, onSubmit, onCancel, isSubmitting }: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          company: initialData.company || '',
          contactEmail: initialData.contactEmail || '',
          contactPhone: initialData.contactPhone || '',
          notes: initialData.notes || '',
        }
      : {
          name: '',
          company: '',
          contactEmail: '',
          contactPhone: '',
          notes: '',
        },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Klien</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap klien" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perusahaan (Opsional)</FormLabel>
                <FormControl>
                  <Input placeholder="Nama perusahaan" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Kontak (Opsional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@klien.com" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telepon Kontak (Opsional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="081234567890" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Catatan Khusus (Opsional)</FormLabel>
                <FormControl>
                <Textarea
                    placeholder="Tulis catatan penting tentang klien ini..."
                    className="min-h-[100px] resize-y"
                    {...field}
                    disabled={isSubmitting}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />


        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Simpan Perubahan' : 'Buat Klien'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
