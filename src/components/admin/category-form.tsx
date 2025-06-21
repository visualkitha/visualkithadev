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
import { LoaderCircle } from 'lucide-react';
import type { BlogCategory } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, 'Nama kategori harus minimal 2 karakter.'),
});

export type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData?: BlogCategory | null;
  onSubmit: (data: CategoryFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CategoryForm({ initialData, onSubmit, onCancel, isSubmitting }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { name: initialData.name }
      : { name: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kategori</FormLabel>
              <FormControl>
                <Input placeholder="cth., Tips & Edukasi" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Simpan Perubahan' : 'Buat Kategori'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
