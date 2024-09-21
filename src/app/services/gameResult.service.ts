import { gameResult } from './../../shared/model/gameResult';
import { Injectable } from '@angular/core';
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
import { gameResultConverter } from './converter/gameResultConverter';

@Injectable({
  providedIn: 'root',
})
export class gameResultService {
  constructor(private firestore: Firestore) {}
  async list(): Promise<gameResult[]> {
    const gameResultCollection = collection(
      this.firestore,
      'gameResult'
    ).withConverter(gameResultConverter);
    const querySnapshot: QuerySnapshot<gameResult> = await getDocs(
        gameResultCollection
    );
    const result: gameResult[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<gameResult>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  async get(id: string): Promise<gameResult | undefined> {
    const docRef = doc(this.firestore, 'gameResult', id).withConverter(
        gameResultConverter
    );

    const chr = await getDoc(docRef);

    if (chr.exists()) return chr.data();

    return undefined;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'gameResult', id).withConverter(
        gameResultConverter
    );

    await deleteDoc(docRef);
  }

  async update(gameResult: gameResult): Promise<void> {
    const docRef = doc(this.firestore, 'gameResult', gameResult.id).withConverter(
        gameResultConverter
    );

    gameResult.date = new Date();

    await setDoc(docRef, gameResult);
  }

  async add(gameResult: gameResult): Promise<void> {
    await addDoc(
      collection(this.firestore, 'gameResult').withConverter(gameResultConverter),
      gameResult
    );
  }
}
