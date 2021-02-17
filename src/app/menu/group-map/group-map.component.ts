import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MapsService } from 'src/app/services/maps.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';
import { VotingPopupComponent } from './voting-popup/voting-popup.component';



@Component({
  selector: 'app-group-map',
  templateUrl: './group-map.component.html',
  styleUrls: ['./group-map.component.scss'],
})
export class GroupMapComponent implements OnInit {

  invitePopup = null;
  mapFiltersPopup = null;
  leaveGroupPopup = null;

  constructor(public userDataService: UserDataService, public popoverController: PopoverController, public mapService: MapsService) {}


  ngOnInit() {
  }


  popop = async function presentPopover(type: string) {

    if (type == "Invite") {
      this.invitePopup = await this.popoverController.create({
        component: InvitePopupComponent,
        componentProps: {
          popover: this.invitePopup,
          type: 'Invite'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.invitePopup.present();
    } else if (type == "Filters") {
      this.mapFiltersPopup = await this.popoverController.create({
        component: FilterPopupComponent,
        componentProps: {
          popover: this.mapFiltersPopup,
          type: 'Filters'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.mapFiltersPopup.present();
    } else if (type == "Voting") {
      this.votingPopup = await this.popoverController.create({
        component: VotingPopupComponent,
        componentProps: {
          popover: this.votingPopup,
          type: 'Voting'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.votingPopup.present();
    } else if (type == "Leave Group") {
      this.leaveGroupPopup = await this.popoverController.create({
        componentProps: {
          popover: this.leaveGroupPopup,
          type: 'Please Confirm'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.leaveGroupPopup.present();
    }
  } // popup

}
