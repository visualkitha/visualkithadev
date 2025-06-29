'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { SiteImages } from '@/lib/types';
import { SiteImagesForm } from './site-images-form';
import { saveSiteImages } from '@/lib/actions';

interface SiteImagesClientPageProps {
  initialImages: SiteImages;
}

export function SiteImagesClientPage({ initialImages }: SiteImagesClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: Partial<SiteImages>) => {
    setIsSubmitting(true);
    const result = await saveSiteImages(data);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Berhasil!',
        description: 'Pengaturan situs telah diperbarui.',
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
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Pengaturan Situs</h1>
        <p className="text-muted-foreground">Kelola gambar utama, tautan kontak, dan pengaturan lainnya untuk situs web Anda.</p>
      </div>
      <SiteImagesForm
        initialData={initialImages}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
