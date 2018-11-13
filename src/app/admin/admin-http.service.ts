import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ProductInterface } from './products/product.interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class AdminHttpService {
  private collectionName = 'products';
  itemDoc: AngularFirestoreDocument<ProductInterface.Product>;
  itemsCollection: AngularFirestoreCollection<ProductInterface.Product>;
  ordersCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  orders: Observable<any[]>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
    public db: AngularFireDatabase
  ) {
    this.httpGetItems();
    this.httpGetOrders();
  }

  httpGetItems() {
    this.itemsCollection = this.afs.collection(this.collectionName, ref => ref.orderBy('title', 'asc'));
    // this.items = this.db.list('products')
    this.items = this.afs.collection(this.collectionName).snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as ProductInterface.Product;
        return data;
      });
    }));
  }

  httpGetOrders() {
    this.ordersCollection = this.afs.collection('orders', ref => ref.orderBy('title', 'asc'));
    // this.items = this.db.list('products')
    this.orders = this.afs.collection('orders').snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  getAll() {
    return this.items;
  }

  getOrders() {
    return this.orders;
  }

  public async productAdd(product: ProductInterface.Product) {
    product.id = this.afs.createId();
    await this.itemsCollection.add(product);
    // return await this.afs.collection('products').add(product);
  }


  public productDelete(id: string) {
    this.itemDoc = this.afs.doc(`products/${id}`);
    return this.itemDoc.delete();
  }
}
