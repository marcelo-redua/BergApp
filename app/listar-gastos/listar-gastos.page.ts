import { Component } from '@angular/core';

import { LoadingController, ToastController } from '@ionic/angular';
import { GastosService } from 'src/app/services/gastos.service';
import { Subscription } from 'rxjs';
import { Gastos } from '../models/gastos';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: 'listar-gastos.page.html',
  styleUrls: ['listar-gastos.page.scss'],
})
export class ListarGastosPage {
  private loading: any;
    public gastos = new Array<Gastos>();
  private gastosSubscription: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private gastosService: GastosService,
    private toastCtrl: ToastController
    ) {
    this.gastosSubscription = this.gastosService.listaGastos().subscribe(data => {
    this.gastos = data;
    });
    }

    ngOnDestroy() {
      this.gastosService.listaGastos();
      }
      async logout() {
      await this.presentLoading();
      }
      async presentLoading() {
      this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...'
      });
      return this.loading.present();
      }
      async deleteGastos(id: string) {
        try {
        await this.gastosService.addGastos;
        } catch (error) {
        this.presentToast('Erro ao tentar deletar');
        }
        }
        async presentToast(message: string) {
        const toast = await this.toastCtrl.create({ message, duration: 2000 });
        toast.present();
        }


}
