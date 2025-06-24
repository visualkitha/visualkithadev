
import { fetchBookingById, fetchClientById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { InvoiceClientPage } from '@/components/admin/invoice-client-page';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type PageProps = {
  params: {
    bookingId: string;
  };
};

export default async function InvoicePage({ params }: PageProps) {
  const booking = await fetchBookingById(params.bookingId);

  if (!booking) {
    notFound();
  }
  
  const client = await fetchClientById(booking.clientId);

  if (!client) {
     return (
        <Card>
            <CardHeader>
                <CardTitle>Klien Tidak Ditemukan</CardTitle>
                <CardDescription>
                    Tidak dapat membuat faktur karena data klien yang terkait dengan booking ini tidak ditemukan.
                </CardDescription>
            </CardHeader>
        </Card>
    )
  }

  return <InvoiceClientPage booking={booking} client={client} />;
}
