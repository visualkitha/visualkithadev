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
import { LoaderCircle, Upload } from 'lucide-react';
import type { BlogPost } from '@/lib/types';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(2, 'Judul harus minimal 2 karakter.'),
  author: z.string().min(2, 'Nama penulis harus minimal 2 karakter.'),
  status: z.enum(['Published', 'Draft']),
  category: z.string().min(1, 'Kategori harus dipilih.'),
  imageUrl: z.string().url('URL Gambar tidak valid.').optional().or(z.literal('')),
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
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
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
          category: initialData.category,
        }
      : {
          title: '',
          author: 'Admin', // Default author
          status: 'Draft',
          imageUrl: '',
          excerpt: '',
          content: '',
          category: '',
        },
  });

  const imageUrlValue = form.watch('imageUrl');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (!storage) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firebase Storage tidak dikonfigurasi.' });
        return;
    }
    
    setIsUploading(true);
    try {
        const storageRef = ref(storage, `blog-covers/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        form.setValue('imageUrl', downloadURL, { shouldValidate: true });
        toast({ title: 'Berhasil', description: 'Gambar berhasil diunggah.' });

    } catch (error) {
        console.error("Upload gambar gagal:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Gagal mengunggah gambar.' });
    } finally {
        setIsUploading(false);
    }
  };

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
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Tips & Edukasi">Tips & Edukasi</SelectItem>
                        <SelectItem value="Promo">Promo</SelectItem>
                        <SelectItem value="Behind the Scene">Behind the Scene</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
        </div>
        
        <div className="space-y-2">
          <FormLabel>Gambar Cover</FormLabel>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Link URL</TabsTrigger>
              <TabsTrigger value="upload">Unggah Gambar</TabsTrigger>
            </TabsList>
            <TabsContent value="url">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Opsional. Kosongkan untuk gambar placeholder."
                        {...field}
                        disabled={isSubmitting || isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="upload">
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <label htmlFor="file-upload" className="relative cursor-pointer w-full">
                  <div className="flex items-center justify-center w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {isUploading ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        <span>Mengunggah...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Pilih file untuk diunggah</span>
                      </>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    disabled={isSubmitting || isUploading}
                  />
                </label>
              </div>
            </TabsContent>
          </Tabs>
          {imageUrlValue && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Pratinjau Gambar:</p>
              <Image
                src={imageUrlValue}
                alt="Pratinjau gambar cover"
                width={300}
                height={150}
                className="rounded-md border object-cover"
              />
            </div>
          )}
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
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {(isSubmitting || isUploading) && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Simpan Perubahan' : 'Buat Postingan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
