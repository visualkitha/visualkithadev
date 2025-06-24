
import { BookingsClientPage } from '@/components/admin/bookings-client-page';
import { fetchBookings, fetchClients, fetchCrewMembers, fetchInventory } from '@/lib/data';

export default async function BookingsAdminPage() {
  const [bookings, clients, crewMembers, inventory] = await Promise.all([
    fetchBookings(),
    fetchClients(),
    fetchCrewMembers(),
    fetchInventory(),
  ]);

  return <BookingsClientPage initialBookings={bookings} initialClients={clients} initialCrewMembers={crewMembers} initialInventory={inventory} />;
}
