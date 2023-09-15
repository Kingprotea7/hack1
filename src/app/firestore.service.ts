import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Agregar un documento a una colección en Firestore
  addDocument(collectionName: string, data: any) {
    return this.firestore.collection(collectionName).add(data);
  }
}
