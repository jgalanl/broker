import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from '../data/user';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private afs: AngularFirestoreCollection<User>;
  
  constructor(private firestore: AngularFirestore) {
    this.afs = this.firestore.collection<User>("Usuarios");
  }

  public getUser(nombre: string):Observable<User[]> {
    return this.firestore.collection<User>('Usuarios', ref => ref.where('nombre', '==', nombre).limit(1)).valueChanges()
  }

}
