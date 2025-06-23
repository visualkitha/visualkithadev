'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useController, type Control } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoaderCircle, Upload } from 'lucide-react';
import type { SiteImages } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Schema for form validation
const formSchema = z.object({
  homeHero: z.string().url().optional(),
  homeWhyUs: z.string().url().optional(),
  homeProject1: z.string().url().optional(),
  homeProject2: z.string().url().optional(),
  homeProject3: z.string().url().optional(),
  homeProject4: z.string().url().optional(),
  aboutHero: z.string().url().optional(),
  aboutProfile: z.string().url().optional(),
  aboutPortfolio1: z.string().url().optional(),
  aboutPortfolio2: z.string().url().optional(),
  aboutPortfolio3: z.string().url().optional(),
  aboutPortfolio4: z.string().url().optional(),
  servicesWhyUs: z.string().url().optional(),
});

type SiteImagesFormValues = z.infer<typeof formSchema>;

interface SiteImagesFormProps {
  initialData: SiteImages;
  onSubmit: (data: SiteImagesFormValues) => void;
  isSubmitting: boolean;
}

// Reusable Image Upload Field Component
const ImageUploadField = ({
  control,
  name,
  label,
  disabled,
}: {
  control: Control<SiteImagesFormValues>;
  name: keyof SiteImagesFormValues;
  label: string;
  disabled: boolean;
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const { field } = useController({ control, name });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!storage) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Firebase Storage tidak dikonfigurasi.',
      });
      return;
    }

    setIsUploading(true);
    const filePath = `site-images/${name}-${Date.now()}-${file.name}`;
    const fileRef = storageRef(storage, filePath);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      field.onChange(downloadURL);
      toast({ title: 'Berhasil', description: 'Gambar berhasil diunggah.' });
    } catch (error) {
      console.error('Firebase image upload failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error Unggah',
        description: `Gagal mengunggah gambar.`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormItem className="space-y-3 rounded-lg border p-4 bg-background">
      <FormLabel className="text-base font-semibold">{label}</FormLabel>
      {field.value && (
        <div className="w-full aspect-video relative rounded-md overflow-hidden border">
          <Image
            src={field.value}
            alt={`Pratinjau untuk ${label}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <FormControl>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <label
            htmlFor={`file-upload-${name}`}
            className="relative cursor-pointer w-full"
          >
            <div className="flex items-center justify-center w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
              id={`file-upload-${name}`}
              name={`file-upload-${name}`}
              type="file"
              className="sr-only"
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/gif, image/webp"
              disabled={disabled || isUploading}
            />
          </label>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export function SiteImagesForm({
  initialData,
  onSubmit,
  isSubmitting,
}: SiteImagesFormProps) {
  const form = useForm<SiteImagesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-4 md:p-6">
            <Accordion
              type="multiple"
              defaultValue={['beranda', 'tentang-kami', 'layanan']}
              className="w-full space-y-4"
            >
              {/* Halaman Beranda */}
              <AccordionItem value="beranda" className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 text-lg font-headline hover:no-underline">Halaman Beranda</AccordionTrigger>
                <AccordionContent className="p-4 border-t bg-muted/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUploadField control={form.control} name="homeHero" label="Gambar Hero" disabled={isSubmitting} />
                  <ImageUploadField control={form.control} name="homeWhyUs" label="Gambar 'Kenapa Memilih Kami'" disabled={isSubmitting} />
                  <ImageUploadField control={form.control} name="homeProject1" label="Gambar Proyek 1" disabled={isSubmitting} />
                  <ImageUploadField control={form.control} name="homeProject2" label="Gambar Proyek 2" disabled={isSubmitting} />
                  <ImageUploadField control={form.control} name="homeProject3" label="Gambar Proyek 3" disabled={isSubmitting} />
                  <ImageUploadField control={form.control} name="homeProject4" label="Gambar Proyek 4" disabled={isSubmitting} />
                </AccordionContent>
              </AccordionItem>

              {/* Halaman Tentang Kami */}
              <AccordionItem value="tentang-kami" className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 text-lg font-headline hover:no-underline">Halaman Tentang Kami</AccordionTrigger>
                <AccordionContent className="p-4 border-t bg-muted/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ImageUploadField control={form.control} name="aboutHero" label="Gambar Hero" disabled={isSubmitting} />
                   <ImageUploadField control={form.control} name="aboutProfile" label="Gambar Profil Perusahaan" disabled={isSubmitting} />
                   <ImageUploadField control={form.control} name="aboutPortfolio1" label="Gambar Portofolio 1" disabled={isSubmitting} />
                   <ImageUploadField control={form.control} name="aboutPortfolio2" label="Gambar Portofolio 2" disabled={isSubmitting} />
                   <ImageUploadField control={form.control} name="aboutPortfolio3" label="Gambar Portofolio 3" disabled={isSubmitting} />
                   <ImageUploadField control={form.control} name="aboutPortfolio4" label="Gambar Portofolio 4" disabled={isSubmitting} />
                </AccordionContent>
              </AccordionItem>

              {/* Halaman Layanan */}
              <AccordionItem value="layanan" className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 text-lg font-headline hover:no-underline">Halaman Layanan</AccordionTrigger>
                <AccordionContent className="p-4 border-t bg-muted/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUploadField control={form.control} name="servicesWhyUs" label="Gambar 'Layanan Kami Berbeda'" disabled={isSubmitting} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Simpan Semua Perubahan
          </Button>
        </div>
      </form>
    </Form>
  );
}
