import type { Equipment } from '@/lib/types';
import { ProductCard } from '@/components/frontend/product-card';
import { fetchEquipment } from '@/lib/data';

export default async function ProductsPage() {
  const products = await fetchEquipment();

  return (
    <>
      <section className="w-full py-20 md:py-28 bg-secondary border-b">
        <div className="container px-4 md:px-6 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Katalog Peralatan Kami
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Telusuri pilihan peralatan Videotron canggih kami, yang dirancang untuk keandalan dan kinerja tinggi.
            </p>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <p>Tidak ada produk yang ditemukan. Silakan periksa kembali nanti.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
