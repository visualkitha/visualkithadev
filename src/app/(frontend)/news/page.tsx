import { fetchBlogPosts, fetchBlogCategories } from '@/lib/data';
import { BlogPostCard } from '@/components/frontend/blog-post-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Update Terbaru | Visual Kitha CMS',
  description: 'Dari cerita di balik layar, tips event, sampai update proyek — semua kami tuangkan di sini.',
};

export default async function NewsPage() {
  const posts = await fetchBlogPosts();
  const categories = await fetchBlogCategories();
  const popularPosts = posts.slice(0, 3); // Ambil 3 post pertama sebagai 'populer'

  return (
    <>
      {/* 1. Hero Section */}
      <section className="w-full py-24 md:py-28 bg-secondary border-b">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Blog & Update Terbaru
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Dari cerita di balik layar, tips event, sampai update proyek — semua kami tuangkan di sini.
          </p>
        </div>
      </section>

      {/* 2. Search and Filter */}
      <section className="py-12 border-b">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Cari artikel berdasarkan judul..." className="pl-10 h-11" />
            </div>
            <div className="flex gap-2">
                 <Button className="w-full h-11">Cari</Button>
            </div>
          </div>
          <div className="flex gap-2 mt-4 justify-center flex-wrap">
            <Button variant="ghost" size="sm">Semua</Button>
            {categories.map((category) => (
              <Button key={category.id} variant="ghost" size="sm">{category.name}</Button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Highlight Artikel */}
      {popularPosts.length > 0 && (
        <section className="py-12 md:py-20">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">🔥 Artikel Terpopuler</h2>
                 </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {popularPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* 3. Blog Feed */}
      <section className="py-12 md:py-20 lg:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Semua Artikel</h2>
          </div>
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

          {/* 5. Pagination */}
          {posts.length > 6 && ( // Hanya tampil jika post lebih dari 6
            <div className="flex justify-center mt-16">
                <Button size="lg">Lihat Artikel Lainnya</Button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Punya Event? Butuh Videotron Keren?</h2>
          <p className="max-w-2xl text-primary-foreground/80">Kalau kamu tertarik dengan apa yang kamu baca, yuk ngobrol sama tim Visual Kitha! Kami siap bantu event kamu jadi makin wow.</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Konsultasi Sekarang</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="https://wa.me/6282133971373" target="_blank">WhatsApp Tim Kami</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
