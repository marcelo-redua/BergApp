import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model'; 
import { ToastController, LoadingController, NavController, Platform } from "@ionic/angular"; 
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  verificar:any;
  usuario={} as Usuario;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private platform: Platform
    ) {}

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.verificar.unsubscribe();
    }
    ionViewDidEnter() {
    this.verificar = this.platform.backButton.subscribe(() => {
    navigator["app"].exitApp();
    });
    }
    async login(usuario: Usuario) {
      if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
      message: "Por Favor Espere..."
      });
      loader.present();
      try {
      await this.afAuth
      .signInWithEmailAndPassword(usuario.email, usuario.senha)
      .then(data => {
      console.log(data);
      this.navCtrl.navigateRoot("home");
      })
      .catch();
      } catch (e) {
      this.showToast(e);
      }
      loader.dismiss();
      }
      }
      formValidation() {
        if (!this.usuario.email) {
        this.showToast("Digite seu e-mail");
        return false;
        }
        if (!this.usuario.senha) {
        this.showToast("Digite sua senha");
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
