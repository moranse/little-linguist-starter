import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { categoryConverter } from './converter/categoryConverter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}
  async list(): Promise<Category[]> {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(categoryConverter);
    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      categoryCollection
    );
    const result: Category[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  async get(id: string): Promise<Category | undefined> {
    const docRef = doc(this.firestore, 'categories', id).withConverter(
      categoryConverter
    );

    const chr = await getDoc(docRef);

    if (chr.exists()) return chr.data();

    return undefined;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'categories', id).withConverter(
      categoryConverter
    );

    await deleteDoc(docRef);
  }

  async update(category: Category): Promise<void> {
    const docRef = doc(this.firestore, 'categories', category.id).withConverter(
      categoryConverter
    );

    category.lastUpdateDate = new Date();

    await setDoc(docRef, category);
  }

  async add(category: Category): Promise<void> {
    await addDoc(
      collection(this.firestore, 'categories').withConverter(categoryConverter),
      category
    );
  }
}
