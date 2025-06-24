
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portofolio | Visual Kitha CMS',
  description: 'Lihat proyek-proyek videotron yang telah kami kerjakan untuk berbagai event.',
};

const projects = [
  {
    title: 'Konser Musik Megah',
    category: 'Event Musik',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'concert stage led',
    description: 'Panggung spektakuler dengan backdrop videotron resolusi tinggi yang memukau ribuan penonton.',
  },
  {
    title: 'Pernikahan Elegan Outdoor',
    category: 'Pernikahan',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'outdoor wedding reception',
    description: 'Menambah sentuhan modern dan personal pada momen sakral dengan layar LED yang menampilkan slideshow kenangan.',
  },
  {
    title: 'Peluncuran Produk Teknologi',
    category: 'Corporate Event',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'product launch stage',
    description: 'Visualisasi produk yang dinamis dan informatif untuk menarik perhatian media dan tamu undangan.',
  },
  {
    title: 'Company Gathering Tahunan',
    category: 'Corporate Event',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'corporate gathering presentation',
    description: 'Layar interaktif untuk presentasi, penghargaan, dan hiburan yang membuat acara internal lebih meriah.',
  },
  {
    title: 'Pameran Otomotif Nasional',
    category: 'Pameran',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'exhibition booth screen',
    description: 'Menarik pengunjung ke booth dengan tampilan visual mobil yang bergerak dan detail spesifikasi yang jelas.',
  },
  {
    title: 'Seminar Internasional',
    category: 'Seminar',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'conference stage screen',
    description: 'Memastikan setiap peserta dapat melihat materi presentasi dengan jelas dari sudut manapun.',
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-24 md:py-28 bg-secondary border-b">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Portofolio Proyek Kami
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Kami bangga telah menjadi bagian dari berbagai acara yang sukses. Lihat beberapa hasil kerja terbaik kami di sini.
          </p>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="w-full py-20 md:py-24 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="aspect-video relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{objectFit: "cover"}}
                    data-ai-hint={project.aiHint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{project.title}</CardTitle>
                  <CardDescription>{project.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" asChild>
                     <Link href="/contact-us">Diskusikan Proyek Serupa</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Punya Ide Proyek?</h2>
          <p className="max-w-2xl text-primary-foreground/80">Mari kita wujudkan bersama. Hubungi tim kami untuk konsultasi gratis dan penawaran terbaik untuk acara Anda.</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Hubungi Kami</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="https://wa.me/6282133971373" target="_blank">Chat via WhatsApp</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
