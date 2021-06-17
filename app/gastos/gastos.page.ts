import { Component, OnInit } from '@angular/core';
import { Gastos } from 'src/app/models/gastos';
import { GastosService } from 'src/app/services/gastos.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  private gastosId: string = null;
  private carregar: any;
  private gastosSubscription: Subscription;

  gastos = {} as Gastos;

  constructor(
    private gastosService : GastosService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
        
      this.gastosId = this.activatedRoute.snapshot.params['id']; // mostrar o produto através da rota do id
    if (this.gastosId) this.carregarGastos();
     }
  
    ngOnInit() {
    }
    ngOnDestroy() {
      if (this.gastosSubscription) this.gastosSubscription.unsubscribe();
      }
      carregarGastos() {
      this.gastosSubscription = this.gastosService.mostraGastos(this.gastosId).subscribe(data => {
      this.gastos = data});
      }
  
      async salvarGastos() {
        await this.presentLoading();
       
         
        try {
          this.gastos.dataCadastro = new Date().getTime();

        await this.gastosService.addGastos(this.gastos);
        await this.carregar.dismiss();
        this.navCtrl.navigateBack('/listar-gastos');
        } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.carregar.dismiss();
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
