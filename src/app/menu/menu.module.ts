import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';

import { GroupListComponent } from './group-list/group-list.component';
import { GroupMapComponent } from './group-map/group-map.component';
import { InboxComponent } from './inbox/inbox.component';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';
import { InvitePopupComponent } from './group-map/invite-popup/invite-popup.component';

// google maps imports
import { GoogleMapsModule } from '@angular/google-maps';
import { FilterPopupComponent } from './group-map/filter-popup/filter-popup.component';
import { VotingPopupComponent } from './group-map/voting-popup/voting-popup.component';
import { LocationInfoPopupComponent } from './group-map/location-info-popup/location-info-popup.component';
import { GroupMembersPopupComponent } from './group-map/group-members-popup/group-members-popup.component';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    GoogleMapsModule
  ],
  declarations: [
    MenuPage,
    GroupMapComponent,
    GroupMembersPopupComponent,
    GroupListComponent,
    InboxComponent,
    MenuPopupComponent,
    InvitePopupComponent,
    FilterPopupComponent,
    VotingPopupComponent,
    LocationInfoPopupComponent,
    TutorialComponent]
})
export class MenuPageModule {}
