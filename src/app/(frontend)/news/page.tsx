import { fetchBlogPosts } from '@/lib/data';
import { BlogPostCard } from '@/components/frontend/blog-post-card';

export default async function NewsPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <section className="w-full py-20 md:py-28 bg-secondary border-b">
        <div className="container px-4 md:px-6 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Berita & Artikel
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Tetap up-to-date dengan yang terbaru dari Visual Kitha.
            </p>
        </div>
      </section>
    
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <p>Tidak ada artikel yang ditemukan. Silakan periksa kembali nanti.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
