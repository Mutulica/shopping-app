import { Injectable } from '@angular/core';

import { ProductInterface } from './products/product.interface';
import { OrderInterface } from '../shared/order.interface';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';


import { map } from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';


@Injectable()

export class AdminHttpService {
  private collectionName = 'products';
  itemDoc: AngularFirestoreDocument<ProductInterface.Product>;
  itemsCollection: AngularFirestoreCollection<ProductInterface.Product>;
  ordersCollection: AngularFirestoreCollection<any>;

  constructor(
    public afs: AngularFirestore,
    public db: AngularFireDatabase,
    public storage: AngularFireStorage
  ) {
    this.httpGetItems();
    this.httpGetOrders();
  }
  // Get Products
  httpGetItems(): Observable<ProductInterface.Product[]> {
    this.itemsCollection = this.afs.collection(this.collectionName, ref => ref.orderBy('title', 'asc'));
    return this.afs.collection(this.collectionName).snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as ProductInterface.Product;
        return data;
      });
    }));
  }

  // Get Orders
  httpGetOrders(): Observable<OrderInterface.Order[]> {
    this.ordersCollection = this.afs.collection('orders', ref => ref.orderBy('title', 'asc'));
    return this.afs.collection('orders').snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as OrderInterface.Order;
        return data;
      });
    }));
  }

  // Add Product
  public async productAdd(product: ProductInterface.Product) {
    product.id = this.afs.createId();
    await this.afs.collection('products').doc(product.id).set(product);
  }

  // Edit Product
  public editProduct(product: ProductInterface.Product) {
    return this.itemsCollection.doc(product.id).ref.update(product);
  }

  // Get Product by id
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

  // Get Order by id
  public async getOrderById(id: string): Promise<OrderInterface.Order> {
    const result = await this.ordersCollection.doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
        return doc.data() as OrderInterface.Order;
      } else {
        console.log('No such document!');
        return null;
      }
    }).catch(function(error) {
      console.log('Error getting document:', error);
    });
    return result as OrderInterface.Order;
  }

  // Upload File
  public async uploadfile(file) {
    const uploadFile = await this.storage.upload(file.name, file);
    const fileSrc =  uploadFile.ref.getDownloadURL();
    return fileSrc;
  }

  // Delete Product
  public productDelete(id: string) {
    this.itemDoc = this.afs.doc(`/products/${id}`);
    return this.itemDoc.delete();
  }

  // Delete Order
  public orderDelete(id: string) {
    this.itemDoc = this.afs.doc(`/orders/${id}`);
    return this.itemDoc.delete();
  }



}
