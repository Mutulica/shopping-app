import { Injectable } from '@angular/core';

import { ProductInterface } from './products/product.interface';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';


import { map } from 'rxjs/operators';


@Injectable()

export class AdminHttpService {
  private collectionName = 'products';
  itemDoc: AngularFirestoreDocument<ProductInterface.Product>;
  itemsCollection: AngularFirestoreCollection<ProductInterface.Product>;
  ordersCollection: AngularFirestoreCollection<any>;

  constructor(
    public afs: AngularFirestore,
    public db: AngularFireDatabase,
  ) {
    this.httpGetItems();
    this.httpGetOrders();
  }

  httpGetItems() {
    this.itemsCollection = this.afs.collection(this.collectionName, ref => ref.orderBy('title', 'asc'));
    // this.items = this.db.list('products')
    return this.afs.collection(this.collectionName).snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as ProductInterface.Product;
        return data;
      });
    }));
  }

  httpGetOrders() {
    this.ordersCollection = this.afs.collection('orders', ref => ref.orderBy('title', 'asc'));
    return this.afs.collection('orders').snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }


  public async productAdd(product: ProductInterface.Product) {
    product.id = this.afs.createId();
    this.afs.collection('products').doc(product.id).set(product).then(
      res => {
        console.log(res);
      }
    );
  }


  public async getById(id: string) {
    return await this.itemsCollection.doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
        return doc.data() as ProductInterface.Product;
      } else {
        console.log('No such document!');
      }
    }).catch(function(error) {
      console.log('Error getting document:', error);
    });
  }

  public async getOrderById(id: string){
    return await this.ordersCollection.doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
        return doc.data() as ProductInterface.Product;
      } else {
        console.log('No such document!');
      }
    }).catch(function(error) {
      console.log('Error getting document:', error);
    });
  }

  public productDelete(id: string) {
    this.itemDoc = this.afs.doc(`/products/${id}`);
    return this.itemDoc.delete();
  }

  public orderDelete(id: string) {
    this.itemDoc = this.afs.doc(`/orders/${id}`);
    return this.itemDoc.delete();
  }



}
