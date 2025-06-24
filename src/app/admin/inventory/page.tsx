
import { fetchInventory } from '@/lib/data';
import { InventoryClientPage } from '@/components/admin/inventory-client-page';

export default async function InventoryPage() {
  const inventoryList = await fetchInventory();

  return <InventoryClientPage initialData={inventoryList} />;
}
