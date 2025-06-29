
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Control, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoaderCircle, Trash2, PlusCircle } from 'lucide-react';
import type { SiteImages } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';

// Schema for form validation, allows for a valid URL or an empty string
const urlOrEmpty = z.string().url({ message: "URL tidak valid." }).or(z.literal("")).optional();

const formSchema = z.object({
  homeHero: urlOrEmpty,
  homeWhyUs: urlOrEmpty,
  homeProject1: urlOrEmpty,
  homeProject2: urlOrEmpty,
  homeProject3: urlOrEmpty,
  homeProject4: urlOrEmpty,
  trustedByLogos: z.array(
    z.object({
      name: z.string().min(1, { message: "Nama logo diperlukan." }),
      logoUrl: z.string().url({ message: "URL tidak valid." }),
    })
  ).optional(),
  aboutHero: urlOrEmpty,
  aboutProfile: urlOrEmpty,
  aboutPortfolio1: urlOrEmpty,
  aboutPortfolio2: urlOrEmpty,
  aboutPortfolio3: urlOrEmpty,
  aboutPortfolio4: urlOrEmpty,
  servicesWhyUs: urlOrEmpty,
  whatsAppNumber: z.string().optional(),
  whatsAppDefaultMessage: z.string().optional(),
});

type SiteImagesFormValues = z.infer<typeof formSchema>;

interface SiteImagesFormProps {
  initialData: SiteImages;
  onSubmit: (data: SiteImagesFormValues) => void;
  isSubmitting: boolean;
}

const isVideo = (url: string) => {
    if (!url) return false;
    const lowerCaseUrl = url.toLowerCase();
    return lowerCaseUrl.endsWith('.mp4') || lowerCaseUrl.endsWith('.webm') || lowerCaseUrl.endsWith('.ogg');
};

// Reusable Media URL Field Component
const MediaUrlField = ({
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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3 rounded-lg border p-4 bg-background">
          <FormLabel className="text-base font-semibold">{label}</FormLabel>
          {field.value && (
            <div className="w-full aspect-video relative rounded-md overflow-hidden border">
                {isVideo(field.value) ? (
                    <video 
                        key={field.value}
                        src={field.value} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <Image
                        src={field.value}
                        alt={`Pratinjau untuk ${label}`}
                        fill
                        style={{objectFit: "cover"}}
                    />
                )}
            </div>
          )}
          <FormControl>
            <Input
              placeholder="Masukkan URL gambar atau video..."
              {...field}
              value={field.value ?? ''}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


export function SiteImagesForm({
  initialData,
  onSubmit,
  isSubmitting,
}: SiteImagesFormProps) {
  const form = useForm<SiteImagesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      trustedByLogos: initialData.trustedByLogos || [],
      whatsAppNumber: initialData.whatsAppNumber || '',
      whatsAppDefaultMessage: initialData.whatsAppDefaultMessage || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "trustedByLogos",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-4 md:p-6">
            <Accordion
              type="multiple"
              defaultValue={['beranda', 'tentang-kami', 'layanan', 'kontak']}
              className="w-full space-y-4"
            >
              {/* Halaman Beranda */}
              <AccordionItem value="beranda" className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 text-lg font-headline hover:no-underline">Halaman Beranda</AccordionTrigger>
                <AccordionContent className="p-4 border-t bg-muted/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MediaUrlField control={form.control} name="homeHero" label="Media Hero (Gambar/Video)" disabled={isSubmitting} />
                  <MediaUrlField control={form.control} name="homeWhyUs" label="Gambar 'Kenapa Memilih Kami'" disabled={isSubmitting} />
                  <MediaUrlField control={form.control} name="homeProject1" label="Gambar Proyek 1" disabled={isSubmitting} />
                  <MediaUrlField control={form.control} name="homeProject2" label="Gambar Proyek 2" disabled={isSubmitting} />
                  <MediaUrlField control={form.control} name="homeProject3" label="Gambar Proyek 3" disabled={isSubmitting} />
                  <MediaUrlField control={form.control} name="homeProject4" label="Gambar Proyek 4" disabled={isSubmitting} />
                  
                  <div className="md:col-span-2 space-y-4 rounded-lg border p-4 bg-background">
                    <h3 className="text-base font-semibold">Logo "Telah Dipercaya oleh"</h3>
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md bg-muted/50">
                          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2">
                             <FormField
                              control={form.control}
                              name={`trustedByLogos.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nama Klien</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nama Klien" {...field} disabled={isSubmitting} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`trustedByLogos.${index}.logoUrl`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>URL Logo</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://..." {...field} disabled={isSubmitting} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={isSubmitting}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", logoUrl: "" })} disabled={isSubmitting}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Tambah Logo
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Halaman Tentang Kami */}
              <AccordionItem value="tentang-kami" className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 text-lg font-headline hover:no-underline">Halaman Tentang Kami</AccordionTrigger>
                <AccordionContent className="p-4 border-t bg-muted/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <MediaUrlField control={form.control} name="aboutHero" label="Media Hero (Gambar/Video)" disabled={isSubmitting} />
                   <MediaUrlField control={form.control} name="aboutProfile" label="Gambar Profil Perusahaan" disabled={isSubmitting} />
                   <MediaUrlField control={form.control} name="aboutPortfolio1" label="Gambar Portofolio 1" disabled={isSubmitting} />
                   <MediaUrlField control={form.control} name="aboutPortfolio2" label="Gambar Portofolio 2" disabled={isSubmitting} />
                   <MediaUrlField control={form.control} name="aboutPortfolio3" label="Gambar Portofolio 3" disabled={isSubmitting} />
                   <MediaUrlField control={form.control} name="aboutPortfolio4" label="Gambar Portofolio 4" disabled={isSubmitting} />
                </AccordionContent>
              </AccordionItem>
              
               {/* Halaman Layanan */}
              <AccordionItem value="layanan" className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 text-lg font-headline hover:no-underline">Halaman Layanan</AccordionTrigger>
                <AccordionContent className="p-4 border-t bg-muted/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MediaUrlField control={form.control} name="servicesWhyUs" label="Gambar 'Layanan Kami Berbeda'" disabled={isSubmitting} />
                </AccordionContent>
              </AccordionItem>
              
              {/* Pengaturan Kontak */}
              <AccordionItem value="kontak" className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 text-lg font-headline hover:no-underline">Pengaturan Kontak</AccordionTrigger>
                <AccordionContent className="p-4 border-t bg-muted/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="whatsAppNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="cth., 6281234567890" {...field} value={field.value ?? ''} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsAppDefaultMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pesan Default WhatsApp</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Pesan yang akan diisi otomatis..." {...field} value={field.value ?? ''} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
