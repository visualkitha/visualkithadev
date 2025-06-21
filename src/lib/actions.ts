'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { db } from '@/lib/firebase';
import type { Equipment, Page } from '@/lib/types';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
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
  status: 'Published' | 'Draft';
  imageUrl: string;
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
    imageUrl: data.imageUrl,
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
