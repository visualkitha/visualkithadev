
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoaderCircle } from 'lucide-react';
import type { CrewMember } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, 'Nama harus minimal 2 karakter.'),
  role: z.string().min(3, 'Peran harus minimal 3 karakter.'),
  status: z.enum(['Available', 'On Duty', 'On Leave']),
});

export type CrewFormValues = z.infer<typeof formSchema>;

interface CrewFormProps {
  initialData?: CrewMember | null;
  onSubmit: (data: CrewFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CrewForm({ initialData, onSubmit, onCancel, isSubmitting }: CrewFormProps) {
  const form = useForm<CrewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          role: initialData.role,
          status: initialData.status,
        }
      : {
          name: '',
          role: '',
          status: 'Available',
        },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peran / Jabatan</FormLabel>
              <FormControl>
                <Input placeholder="cth., Teknisi Utama, Operator" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Available">Tersedia</SelectItem>
                  <SelectItem value="On Duty">Bertugas</SelectItem>
                  <SelectItem value="On Leave">Cuti</SelectItem>
                </SelectContent>
              </Select>
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
            {initialData ? 'Simpan Perubahan' : 'Tambah Anggota'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
