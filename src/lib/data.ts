import 'server-only';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import type { Equipment } from './types';

export async function fetchEquipment(): Promise<Equipment[]> {
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
