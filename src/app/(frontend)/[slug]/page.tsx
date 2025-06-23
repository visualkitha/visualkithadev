
import { fetchPages, fetchPageBySlug, fetchSiteImages } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Gem, Users, Clock, BadgePercent, Layers, Quote } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const pages = await fetchPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await fetchPageBySlug(params.slug);
  if (!page) {
    return {
      title: 'Halaman Tidak Ditemukan',
    }
  }
  return {
    title: `${page.title} | Visual Kitha CMS`,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const page = await fetchPageBySlug(params.slug);
  const siteImages = await fetchSiteImages();

  if (!page) {
    notFound();
  }

  // Template khusus untuk halaman "Tentang Kami"
  if (page.slug === 'about-us') {
    return (
      <>
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white">
          <Image 
            src={siteImages.aboutHero}
            alt="Tim Visual Kitha sedang bekerja" 
            layout="fill" 
            objectFit="cover" 
            className="brightness-50" 
            data-ai-hint="event crew" 
            priority
          />
          <div className="relative z-10 p-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">{page.title}</h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl mt-4">Partner Visual Event Kamu – Profesional, Kreatif, dan Siap Tancap Gas</p>
          </div>
        </section>

        {/* Company Profile Section */}
        <section className="py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Profil Perusahaan</div>
                 <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Siapa Itu Visual Kitha?</h2>
                 <div className="prose prose-lg max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }} />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={siteImages.aboutProfile}
                  alt="Videotron Outdoor dalam sebuah event"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="outdoor concert led"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">Visi & Misi Kami</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Landasan yang mendorong kami untuk selalu memberikan yang terbaik.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-8 md:grid-cols-2">
              <div className="space-y-2">
                 <h3 className="font-headline text-2xl font-bold">Visi</h3>
                 <p className="text-muted-foreground">"{page.vision || 'Visi kami belum ditetapkan.'}"</p>
              </div>
               <div className="space-y-2">
                 <h3 className="font-headline text-2xl font-bold">Misi</h3>
                 <p className="text-muted-foreground">"{page.mission || 'Misi kami belum ditetapkan.'}"</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                Keunggulan Kami
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Kenapa Harus Memilih Kami?
              </h2>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <div className="grid gap-2 text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <Gem className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold mt-2">Kualitas LED Terbaik</h3>
              </div>
              <div className="grid gap-2 text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <Users className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold mt-2">Tim Profesional</h3>
              </div>
              <div className="grid gap-2 text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <Clock className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold mt-2">Tepat Waktu</h3>
              </div>
              <div className="grid gap-2 text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <BadgePercent className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold mt-2">Harga Fleksibel</h3>
              </div>
              <div className="grid gap-2 text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <Layers className="h-10 w-10 mx-auto text-primary" />
                <h3 className="font-headline text-lg font-bold mt-2">Layanan All-in-One</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                    Pengalaman Kami
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Kami telah dipercaya untuk menangani berbagai jenis acara, mulai dari konser, seminar, hingga pameran.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Image src={siteImages.aboutPortfolio1} width={400} height={300} alt="Contoh event konser" className="rounded-lg object-cover" data-ai-hint="concert stage"/>
                <Image src={siteImages.aboutPortfolio2} width={400} height={300} alt="Contoh event seminar" className="rounded-lg object-cover" data-ai-hint="corporate seminar"/>
                <Image src={siteImages.aboutPortfolio3} width={400} height={300} alt="Contoh event peluncuran produk" className="rounded-lg object-cover" data-ai-hint="product launch"/>
                <Image src={siteImages.aboutPortfolio4} width={400} height={300} alt="Contoh event pernikahan" className="rounded-lg object-cover" data-ai-hint="wedding reception"/>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-20 lg:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                     <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                        Kata Mereka Tentang Kami
                    </h2>
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                          <Quote className="h-8 w-8 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">"Pelayanan super, timnya gerak cepat dan profesional. Videotronnya juga terang dan jernih, acara kami jadi lebih hidup!"</p>
                        </CardContent>
                        <CardFooter>
                            <div>
                                <p className="font-semibold">Andi Pratama</p>
                                <p className="text-xs text-muted-foreground">Event Organizer - Music Fest 2024</p>
                            </div>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                          <Quote className="h-8 w-8 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">"Visual Kitha benar-benar partner yang bisa diandalkan. Komunikatif dan sangat membantu dari awal sampai akhir acara."</p>
                        </CardContent>
                        <CardFooter>
                             <div>
                                <p className="font-semibold">Citra Lestari</p>
                                <p className="text-xs text-muted-foreground">Marketing Manager - Corporate Summit</p>
                            </div>
                        </CardFooter>
                    </Card>
                     <Card>
                        <CardHeader>
                          <Quote className="h-8 w-8 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">"Harga bersaing dengan kualitas yang top. Fleksibel dan solutif. Highly recommended!"</p>
                        </CardContent>
                        <CardFooter>
                             <div>
                                <p className="font-semibold">Budi Santoso</p>
                                <p className="text-xs text-muted-foreground">Wedding Organizer</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Siap bikin acara kamu lebih standout?</h2>
            <p className="max-w-2xl text-primary-foreground/80">Hubungi Visual Kitha sekarang untuk konsultasi gratis dan penawaran terbaik!</p>
            <div className="mt-6 flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Hubungi Kami</Link></Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="/products">Lihat Layanan</Link></Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Perender halaman generik untuk halaman lainnya
  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">{page.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }} />
        </CardContent>
      </Card>
    </div>
  );
}
