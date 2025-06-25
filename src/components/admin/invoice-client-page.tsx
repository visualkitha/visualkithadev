
'use client';

import { useRef } from 'react';
import type { Booking, Client } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Printer, FileDown, MessageSquare, ArrowLeft } from 'lucide-react';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';

const logoUrl = "https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/WhatsApp%20Image%202025-06-21%20at%2013.58.18.jpeg";

interface InvoiceClientPageProps {
  booking: Booking;
  client: Client;
}

export function InvoiceClientPage({ booking, client }: InvoiceClientPageProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    const input = invoiceRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${booking.id}.pdf`);
    });
  };
  
  const handleShareWhatsApp = () => {
    const invoiceNumber = `INV-${booking.id.slice(0, 8).toUpperCase()}`;
    const total = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(booking.totalAmount || 0);

    let text = `Yth. ${client.name},\n\n`;
    text += `Berikut adalah rincian tagihan untuk acara Anda:\n\n`;
    text += `*No. Faktur:* ${invoiceNumber}\n`;
    text += `*Acara:* ${booking.eventType}\n`;
    text += `*Tanggal:* ${new Date(booking.eventDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}\n`;
    text += `*Total Tagihan:* ${total}\n\n`;
    text += `Terima kasih atas kepercayaan Anda kepada Visual Kitha.\n\n`;
    text += `(Ini adalah pesan otomatis. Untuk detail lengkap, silakan lihat PDF yang dikirimkan secara terpisah).`;

    const encodedText = encodeURIComponent(text);
    const phoneNumber = client.contactPhone?.replace(/\D/g, ''); // Hapus karakter non-digit
    if (!phoneNumber) {
        alert("Nomor telepon klien tidak tersedia.");
        return;
    }
    
    // Pastikan nomor diawali dengan 62
    const whatsAppNumber = phoneNumber.startsWith('62') ? phoneNumber : `62${phoneNumber.substring(1)}`;
    const url = `https://wa.me/${whatsAppNumber}?text=${encodedText}`;
    
    window.open(url, '_blank');
  }

  const invoiceNumber = `INV-${booking.id.slice(0, 8).toUpperCase()}`;
  const balanceDue = (booking.totalAmount || 0) - (booking.amountPaid || 0);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Booking
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            <span className="sr-only">Cetak</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleExportPdf}>
            <FileDown className="h-4 w-4" />
            <span className="sr-only">Unduh PDF</span>
          </Button>
           <Button variant="outline" size="icon" onClick={handleShareWhatsApp}>
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Bagikan ke WhatsApp</span>
          </Button>
        </div>
      </div>
      <div
        ref={invoiceRef}
        id="invoice-content"
        className="p-8 bg-background rounded-lg shadow-lg border max-w-4xl mx-auto font-body"
      >
        {/* Header */}
        <header className="flex justify-between items-start pb-6 border-b">
          <div className="flex items-center gap-4">
            <Image src={logoUrl} alt="Visual Kitha Logo" width={60} height={60} className="rounded-full" />
            <div>
              <h1 className="text-2xl font-bold font-headline text-primary">Visual Kitha</h1>
              <p className="text-sm text-muted-foreground">Jalan Tentara Pelajar 6, Blora, Jawa Tengah</p>
              <p className="text-sm text-muted-foreground">info@visualkitha.com | +62 821-3397-1373</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-800">FAKTUR</h2>
            <p className="text-sm text-muted-foreground">{invoiceNumber}</p>
          </div>
        </header>

        {/* Client and Dates */}
        <section className="grid grid-cols-2 gap-4 my-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ditagihkan Kepada</h3>
            <p className="font-bold">{client.name}</p>
            {client.company && <p className="text-muted-foreground">{client.company}</p>}
            {client.contactEmail && <p className="text-muted-foreground">{client.contactEmail}</p>}
            {client.contactPhone && <p className="text-muted-foreground">{client.contactPhone}</p>}
          </div>
          <div className="text-right">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <dt className="font-semibold text-gray-500">Tanggal Faktur:</dt>
              <dd className="text-gray-700">{new Date().toLocaleDateString('id-ID')}</dd>
              <dt className="font-semibold text-gray-500">Tanggal Acara:</dt>
              <dd className="text-gray-700">{new Date(booking.eventDate).toLocaleDateString('id-ID')}</dd>
            </dl>
          </div>
        </section>

        {/* Invoice Table */}
        <section>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="p-3 text-left font-semibold">Deskripsi</th>
                  <th className="p-3 text-right font-semibold">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">
                    <p className="font-semibold">Sewa Peralatan untuk {booking.eventType}</p>
                    <p className="text-muted-foreground text-xs">Lokasi: {booking.location}</p>
                  </td>
                  <td className="p-3 text-right">{new Intl.NumberFormat('id-ID').format(booking.totalAmount || 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Totals */}
        <section className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-sm text-muted-foreground">
             <p className="font-bold">Catatan:</p>
             <p>Pembayaran dapat ditransfer ke rekening BCA 123456789 a/n Visual Kitha.</p>
             <p>Terima kasih atas kerja sama Anda.</p>
          </div>
          <div className="text-right space-y-2">
            <dl className="grid grid-cols-2 gap-x-4 text-sm">
                <dt className="font-semibold text-gray-500">Subtotal:</dt>
                <dd className="text-gray-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(booking.totalAmount || 0)}</dd>
                
                <dt className="font-semibold text-gray-500">Pajak (0%):</dt>
                <dd className="text-gray-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)}</dd>
                
                <dt className="font-semibold text-gray-500">Total:</dt>
                <dd className="text-gray-800 font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(booking.totalAmount || 0)}</dd>

                <dt className="font-semibold text-gray-500 col-span-2"><Separator className="my-1"/> </dt><dd></dd>
                
                <dt className="font-semibold text-gray-500">Sudah Dibayar:</dt>
                <dd className="text-gray-800">-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(booking.amountPaid || 0)}</dd>
            </dl>
            <Separator />
            <dl className="grid grid-cols-2 gap-x-4 text-sm">
              <dt className="font-bold text-lg text-primary">Sisa Tagihan:</dt>
              <dd className="font-bold text-lg text-primary">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balanceDue)}</dd>
            </dl>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 mt-12 pt-6 border-t">
          <p>Jika ada pertanyaan mengenai faktur ini, silakan hubungi kami.</p>
          <p>Visual Kitha - Your Event's Visual Partner</p>
        </footer>
      </div>
    </>
  );
}
