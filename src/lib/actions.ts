'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { db } from '@/lib/firebase';
import type { Equipment, Page } from '@/lib/types';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function generateDescriptionAction(productName: string, keySpecifications: string): Promise<{ description?: string; error?: string }> {
  if (!productName || !keySpecifications) {
    return { error: 'Product name and key specifications are required.' };
  }

  try {
    const result = await generateProductDescription({ productName, keySpecifications });
    if (result && result.productDescription) {
        return { description: result.productDescription };
    }
    return { error: 'Failed to generate a valid description.' };
  } catch (error) {
    console.error('AI description generation failed:', error);
    return { error: 'An error occurred while generating the description.' };
  }
}


export async function saveEquipment(equipment: Omit<Equipment, 'id'> & { id?: string }): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore is not initialized.' };

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
    console.error('Failed to save equipment:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to save equipment: ${errorMessage}` };
  }
}

export async function deleteEquipment(id: string): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore is not initialized.' };

  try {
    await deleteDoc(doc(db, 'equipment', id));
    revalidatePath('/admin/equipment');
    revalidatePath('/products');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete equipment:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to delete equipment: ${errorMessage}` };
  }
}


export async function savePage(page: Pick<Page, 'title' | 'content' | 'status' | 'vision' | 'mission'> & { id?: string }): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore is not initialized.' };

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
    console.error('Failed to save page:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to save page: ${errorMessage}` };
  }
}

export async function deletePage(id: string): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Firestore is not initialized.' };

  try {
    await deleteDoc(doc(db, 'pages', id));
    revalidatePath('/admin/pages');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete page:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to delete page: ${errorMessage}` };
  }
}
