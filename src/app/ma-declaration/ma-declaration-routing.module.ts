import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaDeclarationPage } from './ma-declaration.page';

const routes: Routes = [
  {
    path: '',
    component: MaDeclarationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaDeclarationPageRoutingModule {}
