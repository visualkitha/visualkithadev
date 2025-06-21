import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href="#" className="aspect-video block border-b">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={400}
            className="h-full w-full object-cover"
            data-ai-hint="technology article"
          />
      </Link>
      <CardHeader>
        <CardTitle className="font-headline text-xl">
            <Link href="#" className="hover:text-primary transition-colors">{post.title}</Link>
        </CardTitle>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href="#">Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
