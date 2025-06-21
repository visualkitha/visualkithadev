import type { Equipment } from '@/lib/types';
import { ProductCard } from '@/components/frontend/product-card';

const mockProducts: Equipment[] = [
  {
    id: '1',
    name: 'Helix Fi 2 Gateway',
    specifications: 'Wi-Fi 6, 4x4 MU-MIMO, 1.5 Gbps, Voice remote',
    description: 'Experience blazing-fast speeds and wall-to-wall coverage with the Helix Fi 2 gateway, powered by Wi-Fi 6 technology for a superior internet experience.',
    imageUrl: 'https://placehold.co/400x225.png',
  },
  {
    id: '2',
    name: '4K Ultra HD PVR',
    specifications: '4K HDR, 100 hours of 4K recording, 8 tuners',
    description: 'Never miss a moment with the 4K Ultra HD PVR. Record your favorite shows in stunning 4K HDR and watch them whenever you want.',
    imageUrl: 'https://placehold.co/400x225.png',
  },
  {
    id: '3',
    name: 'Helix TV Terminal',
    specifications: '4K compatible, Voice remote, Access to apps',
    description: 'Transform your TV experience with the Helix TV Terminal. Enjoy stunning 4K content, voice control, and access to all your favorite apps in one place.',
    imageUrl: 'https://placehold.co/400x225.png',
  },
    {
    id: '4',
    name: 'Wi-Fi Pods',
    specifications: 'Mesh Wi-Fi, Easy setup, Extends coverage',
    description: 'Eliminate dead zones and enjoy a seamless connection in every room with easy-to-install Wi-Fi Pods that create a powerful mesh network.',
    imageUrl: 'https://placehold.co/400x225.png',
  },
  {
    id: '5',
    name: 'Videotron Mobile Hub',
    specifications: '4G LTE, Connect up to 15 devices, Portable',
    description: 'Stay connected on the go with the Videotron Mobile Hub. Enjoy reliable 4G LTE internet for all your devices, wherever you are.',
    imageUrl: 'https://placehold.co/400x225.png',
  },
    {
    id: '6',
    name: 'High-Speed Cable Modem',
    specifications: 'DOCSIS 3.1, Up to 1 Gbps, IPv6 support',
    description: 'Unlock the full potential of your internet plan with our DOCSIS 3.1 High-Speed Cable Modem, ensuring stable and fast connectivity.',
    imageUrl: 'https://placehold.co/400x225.png',
  },
];

export default function ProductsPage() {
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
