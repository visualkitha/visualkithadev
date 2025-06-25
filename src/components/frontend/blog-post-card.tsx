
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/news/${post.slug}`} className="aspect-video block border-b relative">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            style={{objectFit: "cover"}}
            className="h-full w-full"
            data-ai-hint="technology article"
          />
      </Link>
      <CardHeader>
        <Badge variant="secondary" className="w-fit">{post.category}</Badge>
        <CardTitle className="font-headline text-xl pt-2 min-h-[3.5rem]">
            <Link href={`/news/${post.slug}`} className="hover:text-primary transition-colors line-clamp-2">{post.title}</Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/news/${post.slug}`}>Baca Selengkapnya</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
