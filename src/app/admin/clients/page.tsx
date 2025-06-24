import { ClientsClientPage } from '@/components/admin/clients-client-page';
import { fetchClients } from '@/lib/data';

export default async function ClientsAdminPage() {
  const clients = await fetchClients();
  return <ClientsClientPage initialClients={clients} />;
}
