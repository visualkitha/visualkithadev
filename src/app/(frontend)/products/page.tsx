import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Music, Heart, Building2, Landmark, Settings, Award, Users, Clock, ShieldCheck, Wrench } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="w-full py-20 md:py-28 bg-secondary border-b">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Layanan Sewa Videotron Profesional
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Visual Kitha menyediakan berbagai pilihan layanan videotron untuk semua jenis kebutuhan event — dari yang intimate sampai yang megah.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
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
      <section className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Kami Menyediakan Layanan Videotron untuk:
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Music className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Event Musik & Hiburan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Tampilan LED untuk konser, festival, dan show entertainment. Visual yang terang, jelas, dan kuat di tengah keramaian.</p>
              </CardContent>
            </Card>
             <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Heart className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Acara Pernikahan & Keluarga</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Backdrop LED untuk akad, resepsi, lamaran, hingga ulang tahun. Menambah kesan mewah dan memorable.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Building2 className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Corporate & Brand Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Layar untuk presentasi, launching produk, atau company gathering. Membantu brand tampil lebih profesional.</p>
              </CardContent>
            </Card>
             <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Landmark className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Event Pemerintahan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Layanan untuk kegiatan sosial, kampanye, sosialisasi, atau acara pemerintahan lainnya.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Settings className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Videotron Custom</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Butuh ukuran atau konsep spesifik? Tim kami siap bantu dengan solusi videotron yang dikustomisasi.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Section: Keunggulan Layanan Visual Kitha */}
       <section className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
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
                    src="https://placehold.co/550x400.png"
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
      <section className="w-full py-12 md:py-20 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
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
       <section className="w-full py-12 md:py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Yuk, Buat Acara Kamu Lebih Standout!</h2>
          <p className="max-w-2xl text-primary-foreground/80">Hubungi tim kami sekarang untuk konsultasi dan penawaran terbaik. Kami siap bantu kamu tampil maksimal!</p>
          <div className="mt-6 flex flex-col gap-4 min-[400px]:flex-row">
            <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Konsultasi Gratis</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="https://wa.me/6281234567890" target="_blank">Hubungi via WhatsApp</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
