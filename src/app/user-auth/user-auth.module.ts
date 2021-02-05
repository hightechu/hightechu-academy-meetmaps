import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAuthPageRoutingModule } from './user-auth-routing.module';

import { UserAuthPage } from './user-auth.page';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAuthPageRoutingModule
  ],
  declarations: [UserAuthPage, AuthPopupComponent]
})
export class UserAuthPageModule {}
