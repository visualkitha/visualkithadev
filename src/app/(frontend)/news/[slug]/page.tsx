import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { Calendar, User, CornerUpLeft, Twitter, Linkedin, Facebook, Quote } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BlogPostCard } from '@/components/frontend/blog-post-card';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan',
    }
  }
  return {
    title: `${post.title} | Blog Visual Kitha`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await fetchBlogPostBySlug(params.slug);
  // Fetch related posts, exclude the current one, and take the first 3
  const relatedPosts = (await fetchBlogPosts()).filter(p => p.id !== post?.id).slice(0, 3);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="bg-secondary/50 py-12 md:py-20">
        <div className="container max-w-5xl mx-auto px-4 md:px-6">
          <article className="bg-background rounded-lg shadow-lg overflow-hidden">
            {/* 1. Judul Artikel & 2. Meta Info */}
            <header className="p-6 md:p-10 lg:p-12 text-center">
              <Link href="/news" className="text-sm text-primary hover:underline flex items-center justify-center gap-2 mb-4">
                <CornerUpLeft className="h-4 w-4" />
                Kembali ke Semua Artikel
              </Link>
              <p className="text-primary font-semibold text-sm tracking-wider uppercase">{post.category}</p>
              <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mt-2">{post.title}</h1>
              <div className="flex items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Oleh {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
              </div>
            </header>

            {/* 3. Hero Image */}
            <div className="w-full aspect-video md:aspect-[2/1] lg:aspect-[2.4/1] relative">
              <Image
                src={post.imageUrl}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
                data-ai-hint="blog post header"
              />
            </div>

            {/* 4. Isi Konten Blog */}
            <div className="p-6 md:p-10 lg:p-12">
              <div 
                className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />

              {/* 5. Quote Box */}
              <div className="my-10 p-6 bg-secondary border-l-4 border-primary rounded-r-lg">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <blockquote className="text-xl font-medium text-foreground italic">
                    "Setelah pakai videotron dari Visual Kitha, brand exposure kami naik drastis."
                  </blockquote>
                  <p className="text-right mt-2 text-muted-foreground">– Rina, Brand Manager</p>
              </div>
            </div>
            
            <Separator />

            {/* Share Section */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-semibold text-foreground">Bagikan artikel ini:</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon"><Twitter className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><Facebook className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><Linkedin className="h-4 w-4" /></Button>
                </div>
            </div>
          </article>

          {/* Author Bio */}
          <Card className="mt-12">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl">Tentang Penulis</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
                  <User className="h-16 w-16 text-muted-foreground bg-secondary rounded-full p-3 flex-shrink-0" />
                  <div className="space-y-2 text-center sm:text-left">
                      <h3 className="font-bold text-lg">{post.author}</h3>
                      <p className="text-muted-foreground text-sm">
                          {post.author} adalah bagian dari tim konten di Visual Kitha, dengan spesialisasi dalam teknologi event dan strategi branding.
                      </p>
                  </div>
              </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
              <section className="mt-16 md:mt-24">
                   <h2 className="font-headline text-3xl font-bold tracking-tighter text-center mb-12">
                      Baca Juga Artikel Lainnya
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {relatedPosts.map((relatedPost) => (
                          <BlogPostCard key={relatedPost.id} post={relatedPost} />
                      ))}
                  </div>
              </section>
          )}

        </div>
      </div>

      {/* 6. CTA Section */}
      <section className="w-full mt-16 md:mt-24 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container max-w-4xl mx-auto flex flex-col items-center gap-4 px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Punya Event? Butuh Videotron Keren?</h2>
          <p className="max-w-2xl text-primary-foreground/80">Kalau kamu tertarik dengan apa yang kamu baca, yuk ngobrol sama tim Visual Kitha! Kami siap bantu event kamu jadi makin wow.</p>
          <div className="mt-6 flex flex-col gap-4 min-[400px]:flex-row">
            <Button asChild size="lg" variant="secondary"><Link href="/contact-us">Konsultasi Sekarang</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link href="https://wa.me/6282133971373" target="_blank">WhatsApp Tim Kami</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
