
import Image from 'next/image';
import type { InventoryItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProductCardProps {
  product: InventoryItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="aspect-video overflow-hidden rounded-md border bg-card">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={225}
            className="h-full w-full object-cover"
            data-ai-hint="modem router"
          />
        </div>
        <CardTitle className="font-headline pt-4">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <CardDescription className="flex-grow">{product.description}</CardDescription>
        <Button asChild variant="secondary" className="mt-4 w-full">
            <Link href="/contact-us">Hubungi untuk Sewa</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
