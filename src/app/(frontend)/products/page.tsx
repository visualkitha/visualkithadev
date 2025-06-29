
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Music, Heart, Building2, Landmark, Settings, Award, Users, Clock, ShieldCheck, Wrench, Camera, Tv } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchSiteImages, fetchInventory } from '@/lib/data';
import { ProductCard } from '@/components/frontend/product-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan & Peralatan | Visual Kitha',
  description: 'Visual Kitha menyediakan berbagai pilihan layanan dan peralatan videotron untuk semua jenis kebutuhan event — dari yang intimate sampai yang megah.',
};

export default async function ProductsPage() {
  const siteImages = await fetchSiteImages();
  const products = await fetchInventory();

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="w-full py-24 md:py-28 bg-secondary border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Layanan & Peralatan Kami
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Visual Kitha menyediakan berbagai pilihan layanan dan peralatan videotron untuk semua jenis kebutuhan event — dari yang intimate sampai yang megah.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row justify-center">
            <Button asChild size="lg">
              <Link href="/contact-us">Konsultasi Gratis</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact-us">Hubungi Tim Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Section: Ringkasan Jenis Layanan */}
      <section className="w-full py-24 md:py-28 lg:py-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Solusi untuk Setiap Jenis Acara
            </h2>
          </div>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Music className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Event Musik & Hiburan</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Tampilan LED untuk konser, festival, dan show entertainment. Visual yang terang, jelas, dan kuat di tengah keramaian.</p>
              </CardContent>
            </Card>
             <Card className="flex flex-col text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Acara Pernikahan & Keluarga</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Backdrop LED untuk akad, resepsi, lamaran, hingga ulang tahun. Menambah kesan mewah dan memorable.</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Building2 className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Corporate & Brand Event</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Layar untuk presentasi, launching produk, atau company gathering. Membantu brand tampil lebih profesional.</p>
              </CardContent>
            </Card>
             <Card className="flex flex-col text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Landmark className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Event Pemerintahan</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Layanan untuk kegiatan sosial, kampanye, sosialisasi, atau acara pemerintahan lainnya.</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Settings className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Videotron Custom</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Butuh ukuran atau konsep spesifik? Tim kami siap bantu dengan solusi videotron yang dikustomisasi.</p>
              </CardContent>
            </Card>
             <Card className="flex flex-col text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Camera className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Live Jib & Multicam</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Tingkatkan produksi acara Anda dengan layanan multicamera dan Jib crane profesional untuk angle sinematik.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section: Product Catalog */}
      <section className="w-full py-24 md:py-28 lg:py-32 bg-secondary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Katalog Peralatan Kami
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Lihat beberapa peralatan andalan yang kami sediakan untuk menunjang acara Anda.
            </p>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <p>Katalog peralatan akan segera tersedia. Silakan periksa kembali nanti.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Section: Keunggulan Layanan Visual Kitha */}
       <section className="w-full py-24 md:py-28 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Apa yang Membuat Layanan Kami Berbeda?
              </h2>
               <p className="text-muted-foreground md:text-lg">
                Di Visual Kitha, kami tidak hanya menyewakan layar, kami memberikan solusi visual end-to-end yang menjamin kesuksesan acara Anda.
              </p>
              <ul className="grid gap-4 mt-6 text-base">
                <li className="flex items-start gap-3">
                  <Award className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Kualitas layar LED terbaik (jernih & tahan cuaca).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Tim teknis berpengalaman dan profesional.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Proses instalasi cepat, aman, dan rapi.</span>
                </li>
                 <li className="flex items-start gap-3">
                  <Wrench className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Dukungan teknis penuh selama acara berlangsung.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Layanan fleksibel dan bisa disesuaikan dengan kebutuhan.</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
                <Image
                    src={siteImages.servicesWhyUs}
                    alt="Tim Visual Kitha sedang melakukan instalasi"
                    width={550}
                    height={400}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="event crew"
                />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: FAQ */}
      <section className="w-full py-24 md:py-28 lg:py-32 bg-secondary">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Pertanyaan yang Sering Ditanyakan
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Berapa ukuran layar yang tersedia?</AccordionTrigger>
              <AccordionContent>
                Kami menyediakan berbagai ukuran layar videotron, mulai dari ukuran kecil untuk backdrop hingga layar super besar untuk konser. Ukuran dapat disesuaikan sepenuhnya dengan kebutuhan venue dan konsep acara Anda.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Apakah bisa untuk outdoor dan siang hari?</AccordionTrigger>
              <AccordionContent>
                Tentu saja. Kami memiliki unit videotron outdoor dengan tingkat kecerahan (brightness) tinggi yang dirancang khusus agar tetap terlihat jelas dan tajam bahkan di bawah sinar matahari langsung.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Apakah bisa sewa harian atau hitungan jam?</AccordionTrigger>
              <AccordionContent>
                Ya, kami sangat fleksibel. Layanan kami mencakup sewa harian, paket event (misalnya 3 hari), bahkan untuk kebutuhan beberapa jam saja. Hubungi tim kami untuk mendiskusikan kebutuhan spesifik Anda.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Apakah tim Visual Kitha bantu instalasi di lokasi?</AccordionTrigger>
              <AccordionContent>
                Tentu. Setiap paket sewa sudah termasuk layanan instalasi (pemasangan) dan de-instalasi (pembongkaran) oleh tim teknis kami yang profesional dan berpengalaman untuk memastikan semuanya berjalan lancar dan aman.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-5">
              <AccordionTrigger>Apakah ada layanan backup teknis saat acara berlangsung?</AccordionTrigger>
              <AccordionContent>
                Betul. Kami menyediakan operator atau tim teknis yang akan standby selama acara berlangsung untuk memastikan videotron beroperasi dengan sempurna dan siap menangani jika ada kendala teknis.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

       {/* 5. Call to Action (CTA) Penutup */}
       <section className="w-full py-24 md:py-28 lg:py-32 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Yuk, Buat Acara Kamu Lebih Standout!</h2>
          <p className="max-w-2xl text-primary-foreground/80">Hubungi tim kami sekarang untuk konsultasi dan penawaran terbaik. Kami siap bantu kamu tampil maksimal!</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Konsultasi Gratis</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="https://wa.me/6282133971373" target="_blank">Hubungi via WhatsApp</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
