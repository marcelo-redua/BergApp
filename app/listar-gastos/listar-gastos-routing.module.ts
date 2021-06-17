import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarGastosPage } from './listar-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarGastosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarGastosPageRoutingModule {}
