import { Injectable } from '@angular/core';

import { ProductInterface } from './product/product.interface';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class HomeHttpService {
  private collectionName = 'products';
  itemDoc: AngularFirestoreDocument<ProductInterface.Product>;
  itemsCollection: AngularFirestoreCollection<ProductInterface.Product>;
  items: Observable<ProductInterface.Product[]>;

  constructor(
    public afs: AngularFirestore,
    public db: AngularFireDatabase
  ) {
    this.itemsCollection = this.afs.collection(this.collectionName, ref => ref.orderBy('title', 'asc'));
    this.getDocId().subscribe(res => console.log(res));
  }

  getAll() {
    return this.items = this.afs.collection(this.collectionName).snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as ProductInterface.Product;
        return data;
      });
    }));
  }

  getDocId() {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  public async getById(id: string) {
    return await this.itemsCollection.doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
        return doc.data() as ProductInterface.Product;
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  // public async orderAdd(order: any) {
  //   await this.itemsCollection.add(order);
  // }

  orderAdd(order) {
    order.id = this.afs.createId();
    this.afs.collection('orders').doc(order.id).set(order).then(
      res => {
        console.log(res);
      }
    );
  }

}
