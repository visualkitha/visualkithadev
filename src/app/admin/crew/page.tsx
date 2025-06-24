
import { CrewClientPage } from '@/components/admin/crew-client-page';
import { fetchCrewMembers } from '@/lib/data';

export default async function CrewAdminPage() {
  const crewMembers = await fetchCrewMembers();
  return <CrewClientPage initialCrewMembers={crewMembers} />;
}
