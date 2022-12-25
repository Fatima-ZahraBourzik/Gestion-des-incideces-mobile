import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaDeclarationPageRoutingModule } from './ma-declaration-routing.module';

import { MaDeclarationPage } from './ma-declaration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaDeclarationPageRoutingModule
  ],
  declarations: [MaDeclarationPage]
})
export class MaDeclarationPageModule {}
