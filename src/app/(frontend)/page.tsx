import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, SlidersHorizontal, FileText, Bot } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Visual Kitha CMS
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Sistem manajemen konten yang modern dan intuitif untuk peralatan Videotron.
            Kelola halaman, produk, dan postingan blog dengan mudah menggunakan kekuatan AI.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">Lihat Produk</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Login Admin</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                Fitur Utama
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Semua yang Anda Butuhkan untuk Sukses
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                CMS kami dilengkapi dengan fitur-fitur untuk membantu Anda mengelola kehadiran digital Anda dengan mudah dan efisien.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <div className="grid gap-1 text-center">
              <SlidersHorizontal className="h-10 w-10 mx-auto text-primary" />
              <h3 className="font-headline text-lg font-bold">Manajemen Peralatan</h3>
              <p className="text-sm text-muted-foreground">
                Tambah, perbarui, dan kelola katalog peralatan Videotron Anda dengan mudah.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <FileText className="h-10 w-10 mx-auto text-primary" />
              <h3 className="font-headline text-lg font-bold">Pembuatan Konten</h3>
              <p className="text-sm text-muted-foreground">
                Alat intuitif untuk membuat dan mengelola halaman situs web dan postingan blog.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <Bot className="h-10 w-10 mx-auto text-primary" />
              <h3 className="font-headline text-lg font-bold">Deskripsi Berbasis AI</h3>
              <p className="text-sm text-muted-foreground">
                Hasilkan deskripsi produk yang menarik secara instan dengan alat AI terintegrasi kami.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Sekilas Lini Produk Kami
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Jelajahi pilihan peralatan Videotron berkinerja tinggi kami, yang dirancang untuk keandalan dan kecepatan.
            </p>
            <Button asChild>
              <Link href="/products">Jelajahi Semua Produk</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
             <Image 
                src="https://placehold.co/600x400.png" 
                alt="Pameran Produk"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="modem router"
              />
          </div>
        </div>
      </section>
    </div>
  );
}
