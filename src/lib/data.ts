import 'server-only';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import type { Equipment, BlogPost } from './types';

export async function fetchEquipment(): Promise<Equipment[]> {
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log("Firestore is not initialized. Please check your Firebase configuration in the .env file. Returning empty array.");
    }
    return [];
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


const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Wi-Fi: What is Wi-Fi 6?',
    author: 'Admin',
    status: 'Published',
    createdAt: '2023-11-15',
    imageUrl: 'https://placehold.co/600x400.png',
    excerpt: 'Wi-Fi 6 (802.11ax) is the latest generation of Wi-Fi technology, offering faster speeds, greater capacity, and improved performance in congested environments.',
    content: 'Full content about Wi-Fi 6...',
  },
  {
    id: '2',
    title: 'How to Get the Most Out of Your 4K TV',
    author: 'Editor',
    status: 'Published',
    createdAt: '2023-11-10',
    imageUrl: 'https://placehold.co/600x400.png',
    excerpt: 'A 4K TV is a great investment, but are you using it to its full potential? Here are some tips to maximize your viewing experience.',
    content: 'Full content about 4K TVs...',
  },
  {
    id: '3',
    title: 'Mesh Networks Explained',
    author: 'Admin',
    status: 'Draft',
    createdAt: '2023-11-05',
    imageUrl: 'https://placehold.co/600x400.png',
    excerpt: 'Tired of Wi-Fi dead zones? A mesh network might be the solution. Learn how they work and if one is right for your home.',
    content: 'Full content about mesh networks...',
  },
  {
    id: '4',
    title: 'Top 5 Streaming Apps for Your Helix Terminal',
    author: 'Editor',
    status: 'Published',
    createdAt: '2023-10-28',
    imageUrl: 'https://placehold.co/600x400.png',
    excerpt: 'Discover the best apps to unlock a world of entertainment on your Videotron Helix terminal, from blockbuster movies to binge-worthy series.',
    content: 'Full content about streaming apps...',
  },
];

export async function fetchBlogPosts(options: { includeDrafts?: boolean } = {}): Promise<BlogPost[]> {
  const { includeDrafts = false } = options;
  // In a real app, you would fetch this from Firestore.
  // For now, we'll filter the mock data.
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  if (includeDrafts) {
    return blogPosts;
  }
  return blogPosts.filter(post => post.status === 'Published');
}
