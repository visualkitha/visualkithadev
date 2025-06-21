import { CategoriesClientPage } from '@/components/admin/categories-client-page';
import { fetchBlogCategories } from '@/lib/data';

export default async function BlogCategoriesAdminPage() {
  const categories = await fetchBlogCategories();
  return <CategoriesClientPage initialCategories={categories} />;
}
