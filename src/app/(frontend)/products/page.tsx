import type { Equipment } from '@/lib/types';
import { ProductCard } from '@/components/frontend/product-card';
import { fetchEquipment } from '@/lib/data';

export default async function ProductsPage() {
  const products = await fetchEquipment();

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-2 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Our Equipment Catalog
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Browse our selection of cutting-edge Videotron equipment.
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
          <p>No products found. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
