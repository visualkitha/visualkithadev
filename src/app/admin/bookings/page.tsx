import { BookingsClientPage } from '@/components/admin/bookings-client-page';
import { fetchBookings, fetchClients } from '@/lib/data';

export default async function BookingsAdminPage() {
  const [bookings, clients] = await Promise.all([
    fetchBookings(),
    fetchClients()
  ]);

  return <BookingsClientPage initialBookings={bookings} initialClients={clients} />;
}
