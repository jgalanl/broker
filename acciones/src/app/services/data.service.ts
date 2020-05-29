import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from '../data/user';
import * as firebase from 'firebase';


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

  public insertAccion(nombre: string, empresa: string, fecha: string, numero: number, 
    precio_unitario: number, importe: number){
    this.firestore.collection<User>('Usuarios', ref => ref.where('nombre', '==', nombre)).get().toPromise()
    .then(data => {
      data.forEach(doc => {
        this.firestore.collection("Usuarios").doc(doc.id).update({
          'cartera': firebase.firestore.FieldValue.arrayUnion({
            'empresa': empresa,
            'fecha': fecha,
            'numero': numero,
            'precio_unitario': precio_unitario,
            'importe': importe
          })
        })
      })
    })
    }

}
