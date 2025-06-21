import { fetchBlogPosts } from '@/lib/data';
import { BlogClientPage } from '@/components/admin/blog-client-page';

export default async function BlogAdminPage() {
  // Fetch all posts, including drafts, for the admin view
  const posts = await fetchBlogPosts({ includeDrafts: true });

  return <BlogClientPage initialPosts={posts} />;
}
