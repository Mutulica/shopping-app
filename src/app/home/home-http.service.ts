import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from '../entities/product.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class HomeHttpService {
  private collectionName = 'orders';
  itemDoc: AngularFirestoreDocument<Product>;
  itemsCollection: AngularFirestoreCollection<Product>;
  items: Observable<any[]>;

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
    this.itemsCollection = this.afs.collection(this.collectionName, ref => ref.orderBy('title', 'asc'));
    // this.items = this.db.list('products')
    this.items = this.afs.collection(this.collectionName).snapshotChanges().pipe(map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as Product;
        return data;
      });
    }));
  }

  getAll() {
    return this.items;
  }

  public async orderAdd(order: any) {
    await this.itemsCollection.add(order);
  }

}
