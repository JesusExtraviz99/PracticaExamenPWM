import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  addDocument(collectionName: string, data: any) {
    const ref = collection(this.firestore, collectionName);
    return addDoc(ref, data);
  }

  getCollection(collectionName: string): Observable<any[]> {
    const ref = collection(this.firestore, collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  deleteDocument(collectionName: string, id: string) {
    const ref = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(ref);
  }

  updateDocument(collectionName: string, id: string, data: any) {
    const ref = doc(this.firestore, `${collectionName}/${id}`);
    return updateDoc(ref, data);
  }
}
