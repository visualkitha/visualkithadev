'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Clock, Instagram, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthNavLink } from './auth-nav-link';
import Image from 'next/image';

// Custom icon components for brands not in lucide-react
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 7.5a4.5 4.5 0 0 1-4.5 4.5H15V6a2 2 0 0 1 2-2h1.5a2.5 2.5 0 0 1 2.5 2.5V11" />
        <path d="M9 12a4.5 4.5 0 0 0 4.5 4.5V15a6 6 0 0 1-6-6V3h3a2 2 0 0 1 2 2v10.5" />
    </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
        <title>WhatsApp</title>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.165-.917-.325-.52-.165-.718-.165c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871-.118.571-.355 1.758-1.44 2.03-1.845.271-.405.271-.75.196-.896-.075-.149-.274-.248-.572-.4zM12.012 0C5.385 0 0 5.385 0 12.012s5.385 12.012 12.012 12.012c6.627 0 12.012-5.385 12.012-12.012S18.639 0 12.012 0z"/>
    </svg>
);

const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img//WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50 font-body">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoUrl} alt="Visual Kitha Logo" width={48} height={48} className="rounded-full" />
              <span className="font-headline text-2xl font-bold">Visual Kitha</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Visual Kitha adalah penyedia jasa sewa videotron profesional untuk semua jenis event. Kualitas visual, layanan maksimal.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Navigasi Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link href="/about-us" className="text-muted-foreground hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Layanan</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Portofolio</Link></li>
              <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">News / Artikel</Link></li>
              <li><Link href="/contact-us" className="text-muted-foreground hover:text-primary transition-colors">Kontak</Link></li>
              <li><AuthNavLink className="text-muted-foreground" /></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Layanan Unggulan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sewa Videotron Indoor</li>
              <li>Sewa Videotron Outdoor</li>
              <li>Paket Event</li>
              <li>Custom Installation</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Hubungi Kami</h4>
            <address className="space-y-3 text-sm not-italic">
                <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">Jl. Teknologi Raya No. 42, Jakarta, Indonesia</p>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">+62 821-3397-1373</p>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">info@visualkitha.com</p>
                </div>
                 <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <p className="text-muted-foreground">Senin–Sabtu, 09.00–18.00</p>
                </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center">
            <div className="space-y-2 lg:col-span-1">
                <h4 className="font-headline font-semibold">Dapatkan Info Promo & Event</h4>
                <p className="text-sm text-muted-foreground">Mau dapet info promo & event seru? Masukin email kamu ya!</p>
                <form className="flex space-x-2 mt-2">
                    <Input type="email" placeholder="Email Anda" className="max-w-lg flex-1 bg-background" />
                    <Button type="submit">Langganan</Button>
                </form>
            </div>
            
            <div className="space-y-4 lg:text-center">
                <h4 className="font-headline font-semibold">Ikuti Kami</h4>
                 <div className="flex gap-4 lg:justify-center">
                    <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram className="h-6 w-6" />
                    </Link>
                    <Link href="#" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                        <TikTokIcon className="h-6 w-6" />
                    </Link>
                     <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                        <Youtube className="h-6 w-6" />
                    </Link>
                    <Link href="https://wa.me/6282133971373" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors">
                        <WhatsAppIcon className="h-6 w-6" />
                    </Link>
                </div>
            </div>

            <div className="space-y-4 lg:text-right">
                 <h4 className="font-headline font-semibold">Legal</h4>
                <div className="text-sm space-y-1">
                     <p><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Syarat & Ketentuan</Link></p>
                     <p><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Kebijakan Privasi</Link></p>
                 </div>
            </div>
        </div>

      </div>
      <div className="border-t bg-background/50">
        <div className="container mx-auto py-4 px-4 md:px-6 flex flex-wrap justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Visual Kitha. All rights reserved.</p>
          <p>Website oleh <Link href="#" className="font-semibold text-primary hover:underline">Dimas sujatmiko</Link></p>
        </div>
      </div>
    </footer>
  );
}
