
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CheckCircle, Phone, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { fetchSiteImages } from '@/lib/data';

export default async function HomePage() {
  const siteImages = await fetchSiteImages();

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center text-white">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
            src="https://videos.pexels.com/video-files/853870/853870-hd_1920_1080_25fps.mp4"
          >
            <source src="https://videos.pexels.com/video-files/853870/853870-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Browser Anda tidak mendukung tag video.
          </video>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Bikin Event Kamu Lebih Hidup dengan Visual Kitha
          </h1>
          <p className="mx-auto max-w-[800px] text-lg md:text-xl mt-6">
            Layanan sewa videotron profesional untuk segala jenis acara — mulai dari konser, pernikahan, sampai brand activation. Kualitas visual tajam, pelayanan cepat, hasil memukau.
          </p>
        </div>
      </section>

      {/* 2. Kenapa Memilih Visual Kitha */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Keunggulan Kami</div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Kenapa Memilih Visual Kitha?
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Kami bukan sekadar penyedia layar LED. Visual Kitha adalah partner visual untuk memastikan pesan kamu tersampaikan dengan cara yang paling berkesan.
              </p>
              <ul className="grid gap-4 mt-6 text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Menggunakan videotron berkualitas tinggi untuk indoor dan outdoor.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Instalasi cepat dan aman oleh tim berpengalaman.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Support teknis selama acara berlangsung.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>Pelayanan ramah, respons cepat, dan fleksibel sesuai kebutuhan.</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Image 
                  src={siteImages.homeWhyUs} 
                  alt="Tim Visual Kitha sedang melakukan instalasi"
                  width={550}
                  height={400}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="event crew setup"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Layanan Kami */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Layanan</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Solusi Visual untuk Setiap Acara
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Kami melayani berbagai kebutuhan visual event, siap membantu dari tahap perencanaan sampai eksekusi dengan hasil yang sesuai ekspektasi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader><p className="font-headline font-semibold">Konser & Festival</p></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Videotron untuk konser, festival, atau pertunjukan musik.</p></CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader><p className="font-headline font-semibold">Pernikahan & Event Keluarga</p></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Backdrop pernikahan, engagement, dan acara keluarga.</p></CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader><p className="font-headline font-semibold">Branding & Launching</p></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Keperluan branding, company gathering, dan launching produk.</p></CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader><p className="font-headline font-semibold">Acara Publik & Kampanye</p></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Layanan untuk kampanye, acara pemerintah, dan presentasi publik.</p></CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Proyek Terbaru */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Portofolio</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Proyek Terbaru Kami
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Setiap proyek kami tangani dengan detail, kreativitas, dan profesionalisme.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Image src={siteImages.homeProject1} width={400} height={300} alt="Konser musik independen" className="rounded-lg object-cover hover:scale-105 transition-transform" data-ai-hint="indie concert"/>
            <Image src={siteImages.homeProject2} width={400} height={300} alt="Pernikahan outdoor" className="rounded-lg object-cover hover:scale-105 transition-transform" data-ai-hint="outdoor wedding"/>
            <Image src={siteImages.homeProject3} width={400} height={300} alt="Company gathering" className="rounded-lg object-cover hover:scale-105 transition-transform" data-ai-hint="corporate gathering"/>
            <Image src={siteImages.homeProject4} width={400} height={300} alt="Kampanye politik" className="rounded-lg object-cover hover:scale-105 transition-transform" data-ai-hint="political campaign"/>
          </div>
           <p className="text-center text-sm text-muted-foreground mt-6">Dokumentasi lengkap tersedia atas permintaan.</p>
        </div>
      </section>

      {/* 5. Telah Dipercaya oleh */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Telah Dipercaya oleh
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Kami bangga telah menjadi bagian dari kesuksesan berbagai brand dan acara ternama.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {siteImages.trustedByLogos && siteImages.trustedByLogos.length > 0 ? (
              siteImages.trustedByLogos.map((logo, index) => (
                <Image 
                  key={index}
                  src={logo.logoUrl} 
                  alt={logo.name} 
                  width={150} 
                  height={60} 
                  className="h-[60px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                  data-ai-hint="client logo"
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Logo klien akan segera ditampilkan di sini.</p>
            )}
          </div>
        </div>
      </section>
      
      {/* 6. Ajakan Aksi */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Punya acara dalam waktu dekat?</h2>
          <p className="max-w-2xl text-primary-foreground/80">Butuh tampilan visual yang bikin semua mata tertuju ke panggung? Visual Kitha siap bantu kamu mewujudkannya.</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Konsultasi Gratis Sekarang</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="/contact-us">Hubungi Tim Kami</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
