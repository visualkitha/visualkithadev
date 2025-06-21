import 'server-only';
import { collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { Equipment, BlogPost, Page } from './types';

export async function fetchEquipment(): Promise<Equipment[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore tidak diinisialisasi. Mengembalikan data tiruan untuk peralatan.");
    }
    // Fallback to mock data if Firestore is not available
    return [
        { id: '1', name: 'Gateway Helix Fi 2', specifications: 'Wi-Fi 6, 4x4 MU-MIMO', description: 'Rasakan masa depan konektivitas dengan gateway Helix Fi 2. Nikmati kecepatan lebih tinggi, jangkauan lebih luas, dan koneksi yang lebih andal untuk semua perangkat Anda.', imageUrl: 'https://placehold.co/400x225.png' },
        { id: '2', name: 'Terminal TV Helix', specifications: '4K Ultra HD, Remote Suara', description: 'Ubah hiburan Anda dengan terminal TV Helix. Akses saluran, aplikasi, dan layanan streaming favorit Anda dalam resolusi 4K Ultra HD yang menakjubkan.', imageUrl: 'https://placehold.co/400x225.png' },
        { id: '3', name: 'Remote Suara', specifications: 'Bluetooth, Tombol dengan lampu latar', description: 'Kontrol hiburan Anda dengan suara Anda. Remote suara Helix memudahkan untuk menemukan apa yang ingin Anda tonton, lebih cepat.', imageUrl: 'https://placehold.co/400x225.png' },
    ];
  }

  try {
    const equipmentCollection = collection(db, 'equipment');
    const q = query(equipmentCollection, orderBy('name'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Tidak ada peralatan yang ditemukan di Firestore. Mengembalikan array kosong.');
      return [];
    }

    const equipmentList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Equipment[];

    return equipmentList;
  } catch (error) {
    console.error("Gagal mengambil data peralatan:", error);
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
        { id: '1', title: '5 Alasan Kenapa Videotron Bikin Acara Kamu Naik Level', slug: '5-alasan-videotron-naik-level', author: 'Admin', status: 'Published', createdAt: '2024-06-20', imageUrl: 'https://placehold.co/1200x600.png', excerpt: 'Videotron bukan lagi sekadar layar besar, tapi elemen kunci yang bisa mentransformasi sebuah event. Dari konser hingga acara korporat...', content: `<h3>Subjudul 1: Videotron = Magnet Perhatian di Event</h3><p>Penjelasan kenapa tampilan LED jadi daya tarik utama. Visual yang dinamis dan cerah secara instan menarik perhatian audiens, memastikan pesan Anda tersampaikan dengan efektif.</p><h3>Subjudul 2: Interaktif & Fleksibel</h3><p>Bahas bagaimana videotron bisa tampilkan banyak jenis konten (video, slideshow, countdown, live feed, dll.). Kemampuan ini memberikan ruang kreativitas tanpa batas untuk membuat event Anda lebih engaging.</p><h3>Subjudul 3: Bukti Nyata dari Klien Kami</h3><p>Ceritakan pengalaman sukses salah satu proyek. Misalnya, di acara peluncuran produk X, kami menggunakan videotron interaktif yang memungkinkan audiens berpartisipasi melalui media sosial, meningkatkan engagement hingga 200%.</p>` },
        { id: '2', title: 'Cara Mendapatkan Hasil Maksimal dari TV 4K Anda', slug: 'maksimalkan-tv-4k', author: 'Editor', status: 'Published', createdAt: '2023-11-10', imageUrl: 'https://placehold.co/600x400.png', excerpt: 'TV 4K adalah investasi besar, tetapi apakah Anda menggunakannya secara maksimal?', content: 'Konten lengkap tentang cara memaksimalkan TV 4K Anda. Mencakup tips tentang kalibrasi, pengaturan HDR, dan menemukan konten 4K asli.' },
        { id: '3', title: 'Penjelasan Jaringan Mesh', slug: 'penjelasan-jaringan-mesh', author: 'Admin', status: 'Draft', createdAt: '2023-11-05', imageUrl: 'https://placehold.co/600x400.png', excerpt: 'Bosan dengan zona mati Wi-Fi? Jaringan mesh mungkin solusinya.', content: 'Konten lengkap tentang jaringan mesh. Menjelaskan cara kerjanya, kelebihan dan kekurangannya, dan kapan Anda harus mempertimbangkannya untuk rumah Anda.' },
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
