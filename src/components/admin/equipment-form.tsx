'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

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
import { Wand2, LoaderCircle } from 'lucide-react';
import type { Equipment } from '@/lib/types';
import { generateDescriptionAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, 'Nama produk harus minimal 2 karakter.'),
  specifications: z.string().min(10, 'Spesifikasi harus minimal 10 karakter.'),
  description: z.string().min(20, 'Deskripsi harus minimal 20 karakter.'),
  imageUrl: z.string().url('Silakan masukkan URL yang valid.').optional().or(z.literal('')),
});

export type EquipmentFormValues = z.infer<typeof formSchema>;

interface EquipmentFormProps {
  initialData?: Equipment | null;
  onSubmit: (data: EquipmentFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function EquipmentForm({ initialData, onSubmit, onCancel, isSubmitting }: EquipmentFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          specifications: initialData.specifications,
          description: initialData.description,
          imageUrl: initialData.imageUrl || '',
        }
      : {
          name: '',
          specifications: '',
          description: '',
          imageUrl: '',
        },
  });

  const { watch, setValue } = form;
  const productName = watch('name');
  const keySpecifications = watch('specifications');

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    const result = await generateDescriptionAction(productName, keySpecifications);
    setIsGenerating(false);

    if (result.description) {
      setValue('description', result.description, { shouldValidate: true });
      toast({
        title: 'Berhasil',
        description: 'Deskripsi produk telah dibuat.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Gagal membuat deskripsi.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder="cth., Helix Fi 2 Gateway" {...field} disabled={isSubmitting} />
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
                <FormLabel>URL Gambar</FormLabel>
                <FormControl>
                  <Input placeholder="https://placehold.co/400x225.png" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spesifikasi Utama</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan spesifikasi utama, satu per baris. cth., Wi-Fi 6, 4x4 MU-MIMO"
                      className="min-h-[150px] resize-y"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
                <FormLabel>Deskripsi Dihasilkan AI</FormLabel>
                <Card className="bg-secondary/50">
                    <CardHeader className="p-4">
                        <Button
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={isGenerating || !productName || !keySpecifications || isSubmitting}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            {isGenerating ? (
                              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Wand2 className="mr-2 h-4 w-4" />
                            )}
                            Hasilkan dengan AI
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="mt-2">
                                <FormControl>
                                  <Textarea
                                    placeholder="Klik 'Hasilkan dengan AI' atau tulis deskripsi Anda sendiri..."
                                    className="min-h-[118px] resize-y bg-background"
                                    {...field}
                                    disabled={isSubmitting}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                    </CardContent>
                </Card>
            </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Simpan Perubahan' : 'Buat Peralatan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
