
import { fetchBlogPosts, fetchBlogCategories } from '@/lib/data';
import { BlogPostCard } from '@/components/frontend/blog-post-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog & Update Terbaru | Visual Kitha',
  description: 'Dari cerita di balik layar, tips event, sampai update proyek — semua kami tuangkan di sini.',
};

export default async function NewsPage() {
  const allPosts = await fetchBlogPosts();
  const categories = await fetchBlogCategories();
  
  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const otherPosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="w-full py-20 md:py-24 bg-secondary border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Blog & Update Terbaru
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Dari cerita di balik layar, tips event, sampai update proyek — semua kami tuangkan di sini.
          </p>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Featured Post Section */}
        {featuredPost && (
          <section className="mb-12 md:mb-16 lg:mb-20">
            <Link href={`/news/${featuredPost.slug}`} className="block group">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="featured blog post"
                    priority
                  />
                </div>
                <div className="space-y-4">
                  <Badge variant="default">Artikel Unggulan</Badge>
                  <h2 className="font-headline text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={featuredPost.createdAt}>{new Date(featuredPost.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <Button variant="link" className="p-0 h-auto">
                    Baca Selengkapnya
                  </Button>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Search and All other posts */}
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight">Semua Artikel</h2>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari artikel..." className="pl-10" />
                </div>
                <Button>Cari</Button>
            </div>
          </div>
          
          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
             !featuredPost && ( // only show if there are no posts at all
              <div className="text-center text-muted-foreground py-16 col-span-full">
                <p>Tidak ada artikel yang ditemukan. Silakan periksa kembali nanti.</p>
              </div>
             )
          )}
          
          {/* Pagination */}
          {allPosts.length > 9 && ( // Show if more than featured + grid limit
            <div className="flex justify-center mt-16">
                <Button size="lg">Lihat Artikel Lainnya</Button>
            </div>
          )}
        </section>
      </div>

      {/* CTA Section */}
      <section className="w-full py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Punya Event? Butuh Videotron Keren?</h2>
          <p className="max-w-2xl text-primary-foreground/80">Kalau kamu tertarik dengan apa yang kamu baca, yuk ngobrol sama tim Visual Kitha! Kami siap bantu event kamu jadi makin wow.</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Konsultasi Sekarang</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="https://wa.me/6282133971373" target="_blank">WhatsApp Tim Kami</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
