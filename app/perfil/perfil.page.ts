import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  private perfilId: string = null;
  public perfil: Perfil = {};
  private carregar: any;
  private perfilSubscription: Subscription;

  constructor(
  private perfilService : PerfilService,
  private activatedRoute: ActivatedRoute,
  private navCtrl: NavController,
  private loadingCtrl: LoadingController,
  private toastCtrl: ToastController
  ) {
      
    this.perfilId = this.activatedRoute.snapshot.params['id']; // mostrar o produto através da rota do id
  if (this.perfilId) this.carregarPerfil();
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.perfilSubscription) this.perfilSubscription.unsubscribe();
    }
    carregarPerfil() {
    this.perfilSubscription = this.perfilService.mostraPerfil(this.perfilId).subscribe(data => {
    this.perfil = data});
    }

    async salvarPerfil() {
      await this.presentLoading();
      if (this.perfilId) {
      try {
      await this.perfilService.editarPerfil(this.perfilId, this.perfil);
      await this.carregar.dismiss();      
      this.navCtrl.navigateBack('/listar-perfil');
      } catch (error) {
      this.presentToast('Erro ao tentar editar');
      this.carregar.dismiss();
      }
      } else {
       
      try {
      await this.perfilService.addPerfil(this.perfil);
      await this.carregar.dismiss();
      this.navCtrl.navigateBack('/listar-perfil');
      } catch (error) {
      this.presentToast('Erro ao tentar salvar');
      this.carregar.dismiss();
      }
      }
      }

     

      async presentToast(message:string){
        const toast = await this.toastCtrl.create({ message, duration: 2000 });
        toast.present();
      }
      async presentLoading(){
        this.carregar = await this.loadingCtrl.create({ message: 'Aguarde...' });
        return this.carregar.present();
      }


}
