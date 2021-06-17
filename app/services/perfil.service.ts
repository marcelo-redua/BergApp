import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection }
from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private colecaoPerfil: AngularFirestoreCollection<Perfil>;

 constructor(
  private afs: AngularFirestore
 ) { 
  this.colecaoPerfil = this.afs.collection<Perfil>('Perfil');
 }


 listaPerfil() {
  //snapshotChanges().pipe = filtrar por id
  //map = mapear o perfil através do id
  
  return this.colecaoPerfil.snapshotChanges().pipe(
  map(actions => {
  return actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return { id, ...data };
  });
  })
  );
  }

  addPerfil(perfil: Perfil) {
    return this.colecaoPerfil.add(perfil);
  }
    mostraPerfil(id: string) {
    return this.colecaoPerfil.doc<Perfil>(id).valueChanges();
    }
    editarPerfil(id: string, perfil: Perfil) {
    return this.colecaoPerfil.doc<Perfil>(id).update(perfil);
    }
    excluirPerfil(id: string) {
    return this.colecaoPerfil.doc(id).delete();
    }

}
