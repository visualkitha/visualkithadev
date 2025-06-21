import 'server-only';
import { collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { Equipment, BlogPost, Page } from './types';

export async function fetchEquipment(): Promise<Equipment[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore is not initialized. Returning mock data for equipment.");
    }
    // Fallback to mock data if Firestore is not available
    return [
        { id: '1', name: 'Helix Fi 2 Gateway', specifications: 'Wi-Fi 6, 4x4 MU-MIMO', description: 'Experience the future of connectivity with the Helix Fi 2 gateway. Enjoy faster speeds, wider coverage, and a more reliable connection for all your devices.', imageUrl: 'https://placehold.co/400x225.png' },
        { id: '2', name: 'Helix TV Terminal', specifications: '4K Ultra HD, Voice Remote', description: 'Transform your entertainment with the Helix TV terminal. Access your favorite channels, apps, and streaming services in stunning 4K Ultra HD resolution.', imageUrl: 'https://placehold.co/400x225.png' },
        { id: '3', name: 'Voice Remote', specifications: 'Bluetooth, Backlit keys', description: 'Control your entertainment with the sound of your voice. The Helix voice remote makes it easy to find what you want to watch, faster.', imageUrl: 'https://placehold.co/400x225.png' },
    ];
  }

  try {
    const equipmentCollection = collection(db, 'equipment');
    const q = query(equipmentCollection, orderBy('name'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No equipment found in Firestore. Returning empty array.');
      return [];
    }

    const equipmentList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Equipment[];

    return equipmentList;
  } catch (error) {
    console.error("Failed to fetch equipment:", error);
    // In case of error, return an empty array to prevent crashing the page.
    return [];
  }
}

export async function fetchBlogPosts(options: { includeDrafts?: boolean } = {}): Promise<BlogPost[]> {
  const { includeDrafts = false } = options;
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore is not initialized. Returning mock data for blog posts.");
    }
    // Fallback to mock data
    const mockPosts: BlogPost[] = [
        { id: '1', title: 'The Future of Wi-Fi: What is Wi-Fi 6?', author: 'Admin', status: 'Published', createdAt: '2023-11-15', imageUrl: 'https://placehold.co/600x400.png', excerpt: 'Wi-Fi 6 (802.11ax) is the latest generation of Wi-Fi technology...', content: '' },
        { id: '2', title: 'How to Get the Most Out of Your 4K TV', author: 'Editor', status: 'Published', createdAt: '2023-11-10', imageUrl: 'https://placehold.co/600x400.png', excerpt: 'A 4K TV is a great investment, but are you using it to its full potential?', content: '' },
        { id: '3', title: 'Mesh Networks Explained', author: 'Admin', status: 'Draft', createdAt: '2023-11-05', imageUrl: 'https://placehold.co/600x400.png', excerpt: 'Tired of Wi-Fi dead zones? A mesh network might be the solution.', content: '' },
    ];
    return includeDrafts ? mockPosts : mockPosts.filter(p => p.status === 'Published');
  }

  try {
    const blogCollection = collection(db, 'blogPosts');
    const q = query(blogCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        console.log('No blog posts found in Firestore.');
        return [];
    }

    const allPosts = querySnapshot.docs.map(doc => {
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
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function fetchPages(options: { includeDrafts?: boolean } = {}): Promise<Page[]> {
  const { includeDrafts = false } = options;
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore is not initialized. Returning mock data for pages.");
    }
    const mockPages: Page[] = [
      { id: '1', title: 'Home', slug: 'home', content: 'Welcome to the home page.', status: 'Published', createdAt: '2023-10-01' },
      { id: '2', title: 'About Us', slug: 'about-us', content: 'Visual Kitha is a leading provider of Videotron equipment and services. Our mission is to connect people and businesses with the technology they need to thrive in a digital world.', status: 'Published', createdAt: '2023-10-02', vision: "Menjadi penyedia visual event terbaik dan paling dipercaya di Indonesia.", mission: "Membantu klien menyampaikan pesan secara kuat dan berkesan lewat visual yang memukau." },
      { id: '3', title: 'Contact Us', slug: 'contact-us', content: 'Get in touch with us.', status: 'Published', createdAt: '2023-10-05' },
    ];
    return includeDrafts ? mockPages : mockPages.filter(p => p.status === 'Published');
  }

  try {
    const pagesCollection = collection(db, 'pages');
    const q = query(pagesCollection, orderBy('title'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No pages found in Firestore.');
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
    console.error("Failed to fetch pages:", error);
    return [];
  }
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore is not initialized. Returning mock data for a single page.");
    }
    const mockPages: Page[] = [
      { id: '1', title: 'Home', slug: 'home', content: 'Welcome to the home page.', status: 'Published', createdAt: '2023-10-01' },
      { id: '2', title: 'About Us', slug: 'about-us', content: 'Visual Kitha is a leading provider of Videotron equipment and services. Our mission is to connect people and businesses with the technology they need to thrive in a digital world.', status: 'Published', createdAt: '2023-10-02', vision: "Menjadi penyedia visual event terbaik dan paling dipercaya di Indonesia.", mission: "Membantu klien menyampaikan pesan secara kuat dan berkesan lewat visual yang memukau." },
      { id: '3', title: 'Contact Us', slug: 'contact-us', content: 'Get in touch with us.', status: 'Published', createdAt: '2023-10-05' },
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
    console.error("Failed to fetch page by slug:", error);
    return null;
  }
}
