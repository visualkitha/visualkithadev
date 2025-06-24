import { BookingsClientPage } from '@/components/admin/bookings-client-page';
import { fetchBookings } from '@/lib/data';

export default async function BookingsAdminPage() {
  const bookings = await fetchBookings();
  return <BookingsClientPage initialBookings={bookings} />;
}
