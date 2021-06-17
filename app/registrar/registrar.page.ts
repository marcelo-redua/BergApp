import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import {
ToastController,
LoadingController,
NavController
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  usuario = {} as Usuario;


  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async registrar(usuario: Usuario){
    //console.log(usuario);
    if (this.formValidation()) {
    // mostrar loader
    let loader = await this.loadingCtrl.create({
    message: "Carregando..."
    });
    loader.present();
    try {
    // entrar com usuário e senha
    await this.afAuth.
    createUserWithEmailAndPassword(usuario.email, usuario.senha)
    .then(data => {
    console.log(data);
    // redirecionar para a página home
    this.navCtrl.navigateRoot("home");
    })
    .catch();
      } catch (e) {
      this.showToast(e);
      }
      // dispensar loader
      loader.dismiss();
      }
      }
      formValidation() {
        if (!this.usuario.email) {
        // mostrar toast message
        this.showToast("Digite seu e-mail");
        return false;
        }
        if (!this.usuario.senha) {
        // mostrar toast message
        this.showToast("Digite sua Senha");
        return false;
        }
        return true;
        }
        showToast(mensagem: string) {
          this.toastCtrl
          .create({
          message: mensagem,
          duration: 3000
          })
          .then(toastData => toastData.present());
          }
}
