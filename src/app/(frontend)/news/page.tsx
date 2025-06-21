import { fetchBlogPosts } from '@/lib/data';
import { BlogPostCard } from '@/components/frontend/blog-post-card';

export default async function NewsPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-2 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          News & Articles
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Stay up-to-date with the latest from Visual Kitha.
        </p>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
          <p>No articles found. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
