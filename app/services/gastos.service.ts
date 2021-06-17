import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection }
from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Gastos } from '../models/gastos';


@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private colecaoGastos: AngularFirestoreCollection<Gastos>;

 constructor(
  private afs: AngularFirestore
 ) { 
  this.colecaoGastos = this.afs.collection<Gastos>('Gastos');
 }


 listaGastos() {
  //snapshotChanges().pipe = filtrar por id
  //map = mapear o perfil através do id
  
  return this.colecaoGastos.snapshotChanges().pipe(
  map(actions => {
  return actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return { id, ...data };
  });
  })
  );
  }

  addGastos(gastos: Gastos) {
    return this.colecaoGastos.add(gastos);
  }
    mostraGastos(id: string) {
    return this.colecaoGastos.doc<Gastos>(id).valueChanges();
    }
  

}