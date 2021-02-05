import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';

import { GroupListComponent } from './group-list/group-list.component';
import { GroupMapComponent } from './group-map/group-map.component';
import { InboxComponent } from './inbox/inbox.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage, GroupMapComponent, GroupListComponent, InboxComponent]
})
export class MenuPageModule {}
