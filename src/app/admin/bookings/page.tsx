import { BookingsClientPage } from '@/components/admin/bookings-client-page';
import { fetchBookings, fetchClients, fetchCrewMembers } from '@/lib/data';

export default async function BookingsAdminPage() {
  const [bookings, clients, crewMembers] = await Promise.all([
    fetchBookings(),
    fetchClients(),
    fetchCrewMembers(),
  ]);

  return <BookingsClientPage initialBookings={bookings} initialClients={clients} initialCrewMembers={crewMembers} />;
}
