import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { User } from '../data/user';
import * as firebase from 'firebase';
import { Accion } from '../data/accion';


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
    precio_unitario: number, importe: number): Promise<Boolean>{
      return new Promise((resolve, reject) => {
        try {
          this.firestore.collection<User>('Usuarios', ref => ref.where('nombre', '==', nombre)).get()
          .toPromise().then(data => {
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
        
        resolve(true)
          
        } catch (error) {
          resolve(false)
        }
      })
  }

  public deleteAccion(nombre: string, empresa: Accion): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.firestore.collection<User>('Usuarios', ref => ref.where('nombre', '==', nombre)).get()
        .toPromise().then(data => {
          data.forEach(doc => {
            this.firestore.collection("Usuarios").doc(doc.id).update({
              'cartera': firebase.firestore.FieldValue.arrayRemove(empresa)
            })
          })
        })
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }

}
