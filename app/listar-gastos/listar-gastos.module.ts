import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarGastosPageRoutingModule } from './listar-gastos-routing.module';

import { ListarGastosPage } from './listar-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarGastosPageRoutingModule
  ],
  declarations: [ListarGastosPage]
})
export class ListarGastosPageModule {}
