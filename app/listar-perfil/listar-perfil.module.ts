import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarPerfilPageRoutingModule } from './listar-perfil-routing.module';

import { ListarPerfilPage } from './listar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarPerfilPageRoutingModule
  ],
  declarations: [ListarPerfilPage]
})
export class ListarPerfilPageModule {}
