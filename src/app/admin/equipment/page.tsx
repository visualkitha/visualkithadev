import { fetchEquipment } from '@/lib/data';
import { EquipmentClientPage } from '@/components/admin/equipment-client-page';

export default async function EquipmentPage() {
  const equipmentList = await fetchEquipment();

  return <EquipmentClientPage initialData={equipmentList} />;
}
