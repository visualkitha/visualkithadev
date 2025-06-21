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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoaderCircle } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

const formSchema = z.object({
  title: z.string().min(2, 'Judul harus minimal 2 karakter.'),
  author: z.string().min(2, 'Nama penulis harus minimal 2 karakter.'),
  status: z.enum(['Published', 'Draft']),
  imageUrl: z.string().url('URL Gambar tidak valid.').min(1, 'URL Gambar diperlukan.'),
  excerpt: z.string().min(10, 'Kutipan harus minimal 10 karakter.').max(200, 'Kutipan tidak boleh lebih dari 200 karakter.'),
  content: z.string().min(20, 'Konten harus minimal 20 karakter.'),
});

export type BlogFormValues = z.infer<typeof formSchema>;

interface BlogFormProps {
  initialData?: BlogPost | null;
  onSubmit: (data: BlogFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function BlogForm({ initialData, onSubmit, onCancel, isSubmitting }: BlogFormProps) {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          author: initialData.author,
          status: initialData.status,
          imageUrl: initialData.imageUrl,
          excerpt: initialData.excerpt,
          content: initialData.content,
        }
      : {
          title: '',
          author: 'Admin', // Default author
          status: 'Draft',
          imageUrl: '',
          excerpt: '',
          content: '',
        },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input placeholder="Judul postingan blog Anda" {...field} disabled={isSubmitting} />
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
                    <SelectItem value="Published">Diterbitkan</SelectItem>
                    <SelectItem value="Draft">Draf</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Penulis</FormLabel>
                    <FormControl>
                    <Input placeholder="Nama penulis" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>URL Gambar Cover</FormLabel>
                    <FormControl>
                    <Input placeholder="https://placehold.co/1200x600.png" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Kutipan (Ringkasan)</FormLabel>
                <FormControl>
                <Textarea
                    placeholder="Tulis ringkasan singkat artikel (maks 200 karakter)..."
                    className="min-h-[100px] resize-y"
                    {...field}
                    disabled={isSubmitting}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konten Utama</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tulis konten lengkap blog di sini. Anda bisa menggunakan HTML dasar untuk format."
                  className="min-h-[300px] resize-y"
                  {...field}
                  disabled={isSubmitting}
                />
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
            {initialData ? 'Simpan Perubahan' : 'Buat Postingan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
