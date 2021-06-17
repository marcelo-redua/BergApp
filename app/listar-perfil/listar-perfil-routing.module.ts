import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarPerfilPage } from './listar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ListarPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarPerfilPageRoutingModule {}
