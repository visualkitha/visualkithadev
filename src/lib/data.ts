
import 'server-only';
import { collection, getDocs, query, orderBy, where, limit, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import type { InventoryItem, BlogPost, Page, BlogCategory, SiteImages, ClientLogo, Booking, Client, CrewMember } from './types';

export async function fetchInventory(): Promise<InventoryItem[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data tiruan untuk inventaris.");
    }
    // Fallback to mock data if Firestore is not available
    return [
        { id: '1', name: 'Videotron P3 Indoor', specifications: 'Pixel Pitch 3mm, Brightness 1200nits', description: 'Videotron indoor P3 dengan kualitas gambar tajam, cocok untuk backdrop panggung, seminar, dan pameran di dalam ruangan.', imageUrl: 'https://placehold.co/400x225.png', status: 'Tersedia' },
        { id: '2', name: 'Videotron P5 Outdoor', specifications: 'Pixel Pitch 5mm, Brightness 5500nits', description: 'Videotron outdoor P5 yang tahan cuaca dan sangat terang, ideal untuk konser, festival, dan acara luar ruangan lainnya.', imageUrl: 'https://placehold.co/400x225.png', status: 'Dipinjam' },
        { id: '3', name: 'Kabel Power 50m', specifications: '3x2.5mm, heavy duty', description: 'Kabel power panjang 50 meter untuk kebutuhan daya di lokasi acara yang luas.', imageUrl: 'https://placehold.co/400x225.png', status: 'Maintenance' },
    ];
  }

  try {
    const inventoryCollection = collection(db, 'inventory');
    const q = query(inventoryCollection, orderBy('name'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Tidak ada item inventaris yang ditemukan di Firestore. Mengembalikan array kosong.');
      return [];
    }

    const inventoryList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as InventoryItem[];

    return inventoryList;
  } catch (error) {
    console.error("Gagal mengambil data inventaris:", error);
    // In case of error, return an empty array to prevent crashing the page.
    return [];
  }
}

export async function fetchBlogPosts(options: { includeDrafts?: boolean } = {}): Promise<BlogPost[]> {
  const { includeDrafts = false } = options;
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data tiruan untuk postingan blog.");
    }
    // Fallback to mock data
    const mockPosts: BlogPost[] = [
        { id: '1', title: '5 Alasan Kenapa Videotron Bikin Acara Kamu Naik Level', slug: '5-alasan-videotron-naik-level', author: 'Admin', category: 'Tips & Edukasi', status: 'Published', createdAt: '2024-06-20', imageUrl: 'https://placehold.co/1200x600.png', excerpt: 'Videotron bukan lagi sekadar layar besar, tapi elemen kunci yang bisa mentransformasi sebuah event. Dari konser hingga acara korporat...', content: `<h3>Subjudul 1: Videotron = Magnet Perhatian di Event</h3><p>Penjelasan kenapa tampilan LED jadi daya tarik utama. Visual yang dinamis dan cerah secara instan menarik perhatian audiens, memastikan pesan Anda tersampaikan dengan efektif.</p><h3>Subjudul 2: Interaktif & Fleksibel</h3><p>Bahas bagaimana videotron bisa tampilkan banyak jenis konten (video, slideshow, countdown, live feed, dll.). Kemampuan ini memberikan ruang kreativitas tanpa batas untuk membuat event Anda lebih engaging.</p><h3>Subjudul 3: Bukti Nyata dari Klien Kami</h3><p>Ceritakan pengalaman sukses salah satu proyek. Misalnya, di acara peluncuran produk X, kami menggunakan videotron interaktif yang memungkinkan audiens berpartisipasi melalui media sosial, meningkatkan engagement hingga 200%.</p>` },
        { id: '2', title: 'Cara Mendapatkan Hasil Maksimal dari TV 4K Anda', slug: 'maksimalkan-tv-4k', author: 'Editor', category: 'Promo', status: 'Published', createdAt: '2023-11-10', imageUrl: 'https://placehold.co/600x400.png', excerpt: 'TV 4K adalah investasi besar, tetapi apakah Anda menggunakannya secara maksimal?', content: 'Konten lengkap tentang cara memaksimalkan TV 4K Anda. Mencakup tips tentang kalibrasi, pengaturan HDR, dan menemukan konten 4K asli.' },
        { id: '3', title: 'Penjelasan Jaringan Mesh', slug: 'penjelasan-jaringan-mesh', author: 'Admin', category: 'Behind the Scene', status: 'Draft', createdAt: '2023-11-05', imageUrl: 'https://placehold.co/600x400.png', excerpt: 'Bosan dengan zona mati Wi-Fi? Jaringan mesh mungkin solusinya.', content: 'Konten lengkap tentang jaringan mesh. Menjelaskan cara kerjanya, kelebihan dan kekurangannya, dan kapan Anda harus mempertimbangkannya untuk rumah Anda.' },
    ];
    return includeDrafts ? mockPosts : mockPosts.filter(p => p.status === 'Published');
  }

  try {
    const blogCollection = collection(db, 'blogPosts');
    const allPostsSnapshot = await getDocs(query(blogCollection, orderBy('createdAt', 'desc')));
    
    if (allPostsSnapshot.empty) {
        console.log('Tidak ada postingan blog yang ditemukan di Firestore.');
        return [];
    }

    const allPosts = allPostsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        }
    }) as BlogPost[];

    if (includeDrafts) {
      return allPosts;
    }
    return allPosts.filter(p => p.status === 'Published');

  } catch (error) {
    console.error("Gagal mengambil postingan blog:", error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // For now, we use the mock data approach. A real implementation would query Firestore.
  const posts = await fetchBlogPosts({ includeDrafts: true });
  const post = posts.find((p) => p.slug === slug);
  
  // In a real app, you might want to allow viewing drafts if the user is an admin.
  // For now, we only show published posts.
  if (post && post.status === 'Published') {
    return post;
  }
  
  return null;
}


export async function fetchPages(options: { includeDrafts?: boolean } = {}): Promise<Page[]> {
  const { includeDrafts = false } = options;
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data tiruan untuk halaman.");
    }
    const mockPages: Page[] = [
      { id: '1', title: 'Beranda', slug: 'home', content: 'Selamat datang di halaman beranda.', status: 'Published', createdAt: '2023-10-01' },
      { id: '2', title: 'Tentang Kami', slug: 'about-us', content: 'Visual Kitha adalah penyedia terkemuka peralatan dan layanan Videotron. Misi kami adalah menghubungkan orang dan bisnis dengan teknologi yang mereka butuhkan untuk berkembang di dunia digital.', status: 'Published', createdAt: '2023-10-02', vision: "Menjadi penyedia visual event terbaik dan paling dipercaya di Indonesia.", mission: "Membantu klien menyampaikan pesan secara kuat dan berkesan lewat visual yang memukau." },
      { id: '3', title: 'Hubungi Kami', slug: 'contact-us', content: 'Hubungi kami.', status: 'Published', createdAt: '2023-10-05' },
    ];
    return includeDrafts ? mockPages : mockPages.filter(p => p.status === 'Published');
  }

  try {
    const pagesCollection = collection(db, 'pages');
    // We fetch all and then filter, to avoid needing a composite index on status and title
    const querySnapshot = await getDocs(query(pagesCollection, orderBy('title')));

    if (querySnapshot.empty) {
      console.log('Tidak ada halaman yang ditemukan di Firestore.');
      return [];
    }
    
    const allPages = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      }
    }) as Page[];
    
    if (includeDrafts) {
      return allPages;
    }
    return allPages.filter(p => p.status === 'Published');

  } catch(error) {
    console.error("Gagal mengambil data halaman:", error);
    return [];
  }
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data tiruan untuk satu halaman.");
    }
    const mockPages: Page[] = [
      { id: '1', title: 'Beranda', slug: 'home', content: 'Selamat datang di halaman beranda.', status: 'Published', createdAt: '2023-10-01' },
      { id: '2', title: 'Tentang Kami', slug: 'about-us', content: 'Visual Kitha adalah penyedia terkemuka peralatan dan layanan Videotron. Misi kami adalah menghubungkan orang dan bisnis dengan teknologi yang mereka butuhkan untuk berkembang di dunia digital.', status: 'Published', createdAt: '2023-10-02', vision: "Menjadi penyedia visual event terbaik dan paling dipercaya di Indonesia.", mission: "Membantu klien menyampaikan pesan secara kuat dan berkesan lewat visual yang memukau." },
      { id: '3', title: 'Hubungi Kami', slug: 'contact-us', content: 'Hubungi kami.', status: 'Published', createdAt: '2023-10-05' },
    ];
    const page = mockPages.find((p) => p.slug === slug);
    return (page && page.status === 'Published') ? page : null;
  }

  try {
    const pagesCollection = collection(db, 'pages');
    const q = query(pagesCollection, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    if (data.status !== 'Published') {
      return null;
    }

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    } as Page;

  } catch(error) {
    console.error("Gagal mengambil halaman berdasarkan slug:", error);
    return null;
  }
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data tiruan untuk kategori blog.");
    }
    return [
      { id: '1', name: 'Event' },
      { id: '2', name: 'Wedding' },
      { id: '3', name: 'Tips & Edukasi' },
      { id: '4', name: 'Promo' },
      { id: '5', name: 'Behind the Scene' },
    ];
  }

  try {
    const categoriesCollection = collection(db, 'blogCategories');
    const q = query(categoriesCollection, orderBy('name'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Tidak ada kategori blog yang ditemukan di Firestore.');
      return [];
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogCategory[];
  } catch (error) {
    console.error("Gagal mengambil kategori blog:", error);
    return [];
  }
}

const defaultImages: SiteImages = {
  id: 'main' as const,
  homeHero: 'https://placehold.co/1920x1080.png',
  homeWhyUs: 'https://placehold.co/550x400.png',
  homeProject1: 'https://placehold.co/400x300.png',
  homeProject2: 'https://placehold.co/400x300.png',
  homeProject3: 'https://placehold.co/400x300.png',
  homeProject4: 'https://placehold.co/400x300.png',
  trustedByLogos: [
    { name: 'Logo Pemkab Jepara', logoUrl: 'https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/Seal_of_Jepara_Regency.svg' },
    { name: 'Logo KONI', logoUrl: 'https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/Logo-KONI-Daerah-18.png' },
    { name: 'Logo Bank BRI', logoUrl: 'https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/Logo-Bank-BRI.png' },
    { name: 'Logo Bank Mandiri', logoUrl: 'https://fgzhmpauhvwlllpcrzii.supabase.co/storage/v1/object/public/img/Bank_Mandiri_logo_2016.svg.png' },
  ],
  aboutHero: 'https://placehold.co/1920x1080.png',
  aboutProfile: 'https://placehold.co/600x450.png',
  aboutPortfolio1: 'https://placehold.co/400x300.png',
  aboutPortfolio2: 'https://placehold.co/400x300.png',
  aboutPortfolio3: 'https://placehold.co/400x300.png',
  aboutPortfolio4: 'https://placehold.co/400x300.png',
  servicesWhyUs: 'https://placehold.co/550x400.png',
};

export async function fetchSiteImages(): Promise<SiteImages> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data gambar tiruan.");
    }
    return defaultImages;
  }
  try {
    const docRef = doc(db, 'site_settings', 'images');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Merge default images with stored data to ensure all keys are present
      return { ...defaultImages, ...docSnap.data() };
    } else {
      console.log("Dokumen gambar situs tidak ditemukan. Mengembalikan nilai default.");
      return defaultImages;
    }
  } catch (error) {
    console.error("Gagal mengambil gambar situs:", error);
    return defaultImages;
  }
}

export async function fetchBookings(): Promise<Booking[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data booking tiruan.");
    }
    // Fallback to mock data
    return [
      { id: '1', clientId: '1', clientName: 'PT Jaya Abadi', location: 'Hotel Grand Hyatt', eventType: 'Corporate Gathering', eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'Confirmed', paymentStatus: 'Paid', totalAmount: 5000000, amountPaid: 5000000, technicalNeeds: [{description: 'LED Screen 4x3m', completed: true}, {description: 'Sound System 5000 watt', completed: false}], crewTasks: [], assignedCrew: [], createdAt: new Date().toISOString() },
      { id: '2', clientId: '2', clientName: 'Andi & Siska', location: 'Gedung Serbaguna', eventType: 'Pernikahan', eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'Draft', paymentStatus: 'Down Payment', totalAmount: 10000000, amountPaid: 2500000, technicalNeeds: [{description: 'Backdrop LED', completed: false}], crewTasks: [], assignedCrew: [], createdAt: new Date().toISOString() },
    ];
  }
  try {
    const bookingsCollection = collection(db, 'bookings');
    const q = query(bookingsCollection, orderBy('eventDate', 'desc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        eventDate: data.eventDate, // Already stored as ISO string from server action
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as Booking;
    });
  } catch (error) {
    console.error("Gagal mengambil data booking:", error);
    return [];
  }
}

export async function fetchBookingById(id: string): Promise<Booking | null> {
  if (!db) return null;
  try {
    const docRef = doc(db, 'bookings', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      eventDate: data.eventDate,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    } as Booking;
  } catch (error) {
    console.error("Gagal mengambil booking berdasarkan ID:", error);
    return null;
  }
}

export async function fetchClients(): Promise<Client[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data klien tiruan.");
    }
    // Fallback to mock data
    return [
      { id: '1', name: 'PT Jaya Abadi', company: 'PT Jaya Abadi', contactEmail: 'contact@jayaabadi.com', contactPhone: '08123456789', notes: 'Klien VIP, sering memesan untuk acara tahunan.', createdAt: new Date().toISOString() },
      { id: '2', name: 'Andi & Siska', company: '', contactEmail: 'andi.siska@email.com', contactPhone: '08987654321', notes: 'Booking untuk pernikahan.', createdAt: new Date().toISOString() },
    ];
  }
  try {
    const clientsCollection = collection(db, 'clients');
    const q = query(clientsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as Client;
    });
  } catch (error) {
    console.error("Gagal mengambil data klien:", error);
    return [];
  }
}

export async function fetchClientById(id: string): Promise<Client | null> {
    if (!db) return null;
    try {
        const docRef = doc(db, 'clients', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        
        const data = docSnap.data();
        return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        } as Client;
    } catch (error) {
        console.error("Gagal mengambil klien berdasarkan ID:", error);
        return null;
    }
}


export async function fetchCrewMembers(): Promise<CrewMember[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data kru tiruan.");
    }
    // Fallback to mock data
    return [
      { id: '1', name: 'Budi Teknisi', role: 'Teknisi Utama', status: 'Available', createdAt: new Date().toISOString() },
      { id: '2', name: 'Anton Operator', role: 'Operator VJ', status: 'On Duty', createdAt: new Date().toISOString() },
    ];
  }
  try {
    const crewCollection = collection(db, 'crewMembers');
    const q = query(crewCollection, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      } as CrewMember;
    });
  } catch (error) {
    console.error("Gagal mengambil data kru:", error);
    return [];
  }
}
