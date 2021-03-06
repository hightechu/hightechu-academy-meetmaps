import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MapsService } from 'src/app/services/maps.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { MenuPopupComponent } from '../menu-popup/menu-popup.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {

  createGroupPopup = null;

  constructor(public userDataService: UserDataService, private popoverController: PopoverController, public mapService: MapsService) { }

  ngOnInit() {}

  navToGroup(groupUid: string) {
    this.userDataService.currentComponent = 'group-map';
    this.userDataService.currentGroup = this.userDataService.getGroupFromUid(groupUid);
    this.userDataService.SubscribeToGroupMembers();
    this.mapService.addMarker(this.userDataService.user.pos, 'red', this.userDataService.user.username);
    this.mapService.zoom = 11; 

  }

  popop = async function presentPopover(type: string) {
    if (type == "Create Group") {
      this.createGroupPopup = await this.popoverController.create({
        component: MenuPopupComponent,
        componentProps: {
          popover: this.createGroupPopup,
          type: 'Create Group'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.createGroupPopup.present();
    }
  }

}
