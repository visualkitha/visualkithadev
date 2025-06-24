import { ScheduleClientPage } from '@/components/admin/schedule-client-page';
import { fetchBookings } from '@/lib/data';

export default async function SchedulePage() {
  const bookings = await fetchBookings();
  return <ScheduleClientPage initialBookings={bookings} />;
}
