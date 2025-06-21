import { fetchPages } from '@/lib/data';
import { PagesClientPage } from '@/components/admin/pages-client-page';

export default async function PagesAdminPage() {
  const pages = await fetchPages({ includeDrafts: true });

  return <PagesClientPage initialPages={pages} />;
}
