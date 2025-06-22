
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hubungi Kami | Visual Kitha CMS',
  description: 'Kami siap bantu wujudkan event kamu jadi lebih hidup dengan videotron berkualitas.',
}

export default function ContactUsPage() {
  return (
    <>
      {/* 1. Header Section */}
      <section className="w-full py-20 md:py-28 bg-secondary border-b">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Hubungi Visual Kitha
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Kami siap bantu wujudkan event kamu jadi lebih hidup dengan videotron berkualitas. Konsultasi gratis, respon cepat, dan layanan profesional.
          </p>
        </div>
      </section>

      {/* Main content section with form and info */}
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* 2. Form Kontak */}
            <Card>
              <CardHeader>
                <CardTitle>Formulir Kontak</CardTitle>
                <CardDescription>
                  Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor HP / WhatsApp</Label>
                    <Input id="phone" type="tel" placeholder="081234567890" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Alamat Email (Opsional)</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Jenis Acara (Opsional)</Label>
                    <Select>
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Pilih jenis acara Anda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="konser">Konser / Festival</SelectItem>
                        <SelectItem value="wedding">Wedding / Pernikahan</SelectItem>
                        <SelectItem value="corporate">Corporate / Launching</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan / Detail Kebutuhan</Label>
                    <Textarea id="message" placeholder="Jelaskan kebutuhan Anda di sini..." className="min-h-[120px]" required />
                  </div>
                  <Button type="submit" className="w-full">Kirim Pesan</Button>
                </form>
              </CardContent>
            </Card>

            {/* 3 & 4. Kontak Langsung & CTAs */}
            <div className="flex flex-col justify-start space-y-10">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-4">Kontak Langsung</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">WhatsApp</h4>
                      <p className="text-muted-foreground">+62 821-3397-1373</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-muted-foreground">info@visualkitha.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Lokasi</h4>
                      <p className="text-muted-foreground">Jakarta, Indonesia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">Jam Kerja</h4>
                      <p className="text-muted-foreground">Senin–Sabtu, 09.00–18.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold mb-4">Aksi Cepat</h3>
                <div className="flex flex-col space-y-3">
                  <Button asChild size="lg">
                    <Link href="https://wa.me/6282133971373" target="_blank">Chat WhatsApp Sekarang</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/contact-us">Konsultasi Gratis</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/products">Lihat Layanan Kami</Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
