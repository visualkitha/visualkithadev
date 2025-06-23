import { SiteImagesClientPage } from '@/components/admin/site-images-client-page';
import { fetchSiteImages } from '@/lib/data';

export default async function SiteImagesAdminPage() {
  const images = await fetchSiteImages();
  return <SiteImagesClientPage initialImages={images} />;
}
