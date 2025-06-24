'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { db } from '@/lib/firebase';
import type { Booking, Equipment, Page, SiteImages, TechnicalNeed } from '@/lib/types';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function generateDescriptionAction(productName: string, keySpecifications: string): Promise<{ description?: string; error?: string }> {
  if (!productName || !keySpecifications) {
    return { error: 'Nama produk dan spesifikasi utama diperlukan.' };
  }

  try {
    const result = await generateProductDescription({ productName, keySpecifications });
    if (result && result.productDescription) {
        return { description: result.productDescription };
    }
    return { error: 'Gagal menghasilkan deskripsi yang valid.' };
  } catch (error) {
    console.error('Pembuatan deskripsi AI gagal:', error);
    return { error: 'Terjadi kesalahan saat membuat deskripsi.' };
  }
}


export async function saveEquipment(equipment: Omit<Equipment, 'id'> & { id?: string }): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  const dataToSave = { ...equipment };
  delete dataToSave.id;

  try {
    if (equipment.id) {
      await setDoc(doc(db, 'equipment', equipment.id), dataToSave, { merge: true });
    } else {
      await addDoc(collection(db, 'equipment'), dataToSave);
    }
    revalidatePath('/admin/equipment');
    revalidatePath('/products');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Gagal menyimpan peralatan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menyimpan peralatan: ${errorMessage}` };
  }
}

export async function deleteEquipment(id: string): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  try {
    await deleteDoc(doc(db, 'equipment', id));
    revalidatePath('/admin/equipment');
    revalidatePath('/products');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Gagal menghapus peralatan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menghapus peralatan: ${errorMessage}` };
  }
}


export async function savePage(page: Pick<Page, 'title' | 'content' | 'status' | 'vision' | 'mission'> & { id?: string }): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  const slug = page.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const pageData = {
    title: page.title,
    content: page.content,
    status: page.status,
    slug: slug,
    vision: page.vision || "",
    mission: page.mission || "",
  };

  try {
    if (page.id) {
      await setDoc(doc(db, 'pages', page.id), pageData, { merge: true });
    } else {
      const dataWithTimestamp = { ...pageData, createdAt: serverTimestamp() };
      await addDoc(collection(db, 'pages'), dataWithTimestamp);
    }
    revalidatePath('/admin/pages');
    revalidatePath('/');
    revalidatePath(`/${slug}`);
    return { success: true };
  } catch (error) {
    console.error('Gagal menyimpan halaman:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menyimpan halaman: ${errorMessage}` };
  }
}

export async function deletePage(id: string): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  try {
    await deleteDoc(doc(db, 'pages', id));
    revalidatePath('/admin/pages');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Gagal menghapus halaman:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menghapus halaman: ${errorMessage}` };
  }
}

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w-]+/g, '') // Hapus semua karakter non-kata
    .replace(/--+/g, '-') // Ganti beberapa - dengan satu -
    .replace(/^-+/, '') // Potong - dari awal teks
    .replace(/-+$/, ''); // Potong - dari akhir teks
};

export async function saveBlogPost(data: {
  id?: string;
  title: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft';
  imageUrl?: string | null;
  excerpt: string;
  content: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  const slug = createSlug(data.title);

  const postData = {
    title: data.title,
    slug: slug,
    author: data.author,
    status: data.status,
    category: data.category,
    imageUrl: data.imageUrl || 'https://placehold.co/1200x600.png',
    excerpt: data.excerpt,
    content: data.content,
  };

  try {
    if (data.id) {
      const postRef = doc(db, 'blogPosts', data.id);
      await setDoc(postRef, postData, { merge: true });
    } else {
      const dataWithTimestamp = { ...postData, createdAt: serverTimestamp() };
      await addDoc(collection(db, 'blogPosts'), dataWithTimestamp);
    }
    revalidatePath('/admin/blog');
    revalidatePath('/news');
    revalidatePath(`/news/${slug}`);
    return { success: true };
  } catch (error) {
    console.error('Gagal menyimpan postingan blog:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menyimpan postingan blog: ${errorMessage}` };
  }
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  try {
    await deleteDoc(doc(db, 'blogPosts', id));
    revalidatePath('/admin/blog');
    revalidatePath('/news');
    return { success: true };
  } catch (error) {
    console.error('Gagal menghapus postingan blog:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menghapus postingan blog: ${errorMessage}` };
  }
}


export async function saveBlogCategory(category: { id?: string; name: string }): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };
  if (!category.name) return { success: false, error: 'Nama kategori diperlukan.' };

  const dataToSave = { name: category.name };

  try {
    if (category.id) {
      await setDoc(doc(db, 'blogCategories', category.id), dataToSave);
    } else {
      await addDoc(collection(db, 'blogCategories'), dataToSave);
    }
    revalidatePath('/admin/blog/categories');
    revalidatePath('/admin/blog');
    revalidatePath('/news');
    return { success: true };
  } catch (error) {
    console.error('Gagal menyimpan kategori blog:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menyimpan kategori blog: ${errorMessage}` };
  }
}

export async function deleteBlogCategory(id: string): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  try {
    await deleteDoc(doc(db, 'blogCategories', id));
    revalidatePath('/admin/blog/categories');
    revalidatePath('/admin/blog');
    revalidatePath('/news');
    return { success: true };
  } catch (error) {
    console.error('Gagal menghapus kategori blog:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menghapus kategori blog: ${errorMessage}` };
  }
}

export async function saveSiteImages(images: Partial<Omit<SiteImages, 'id'>>): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  try {
    await setDoc(doc(db, 'site_settings', 'images'), images, { merge: true });
    
    revalidatePath('/');
    revalidatePath('/about-us');
    revalidatePath('/products');
    revalidatePath('/admin/site-images');

    return { success: true };
  } catch (error) {
    console.error('Gagal menyimpan gambar situs:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menyimpan gambar situs: ${errorMessage}` };
  }
}

export async function saveBooking(data: {
    id?: string;
    clientName: string;
    location: string;
    eventDate: Date;
    eventType: string;
    status: 'Draft' | 'Confirmed' | 'Ongoing' | 'Completed' | 'Cancelled';
    technicalNeeds: TechnicalNeed[];
}): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };

  const bookingData = {
    clientName: data.clientName,
    location: data.location,
    eventDate: data.eventDate.toISOString(),
    eventType: data.eventType,
    status: data.status,
    technicalNeeds: data.technicalNeeds,
  };

  try {
    if (data.id) {
      const bookingRef = doc(db, 'bookings', data.id);
      await setDoc(bookingRef, bookingData, { merge: true });
    } else {
      const dataWithTimestamp = { ...bookingData, createdAt: serverTimestamp() };
      await addDoc(collection(db, 'bookings'), dataWithTimestamp);
    }
    revalidatePath('/admin/bookings');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Gagal menyimpan data booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menyimpan data booking: ${errorMessage}` };
  }
}

export async function deleteBooking(id: string): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore tidak diinisialisasi.' };
  try {
    await deleteDoc(doc(db, 'bookings', id));
    revalidatePath('/admin/bookings');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Gagal menghapus data booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.';
    return { success: false, error: `Gagal menghapus data booking: ${errorMessage}` };
  }
}
