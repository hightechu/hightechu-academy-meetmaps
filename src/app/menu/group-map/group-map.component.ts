import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MapsService } from 'src/app/services/maps.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';
import { VotingPopupComponent } from './voting-popup/voting-popup.component';
import { GoogleMap } from '@angular/google-maps';
import { LocationInfoPopupComponent } from './location-info-popup/location-info-popup.component';



@Component({
  selector: 'app-group-map',
  templateUrl: './group-map.component.html',
  styleUrls: ['./group-map.component.scss'],
})
export class GroupMapComponent implements OnInit {

  @ViewChild('myMap') map: GoogleMap;

  invitePopup = null;
  mapFiltersPopup = null;
  leaveGroupPopup = null;
  votingPopup = null;
  locationInfoPopup = null;

  currentLocationName = "";
  currentWebsite = "";
  currentRating = 0;
  currentPrice = 0;

  constructor(public userDataService: UserDataService, public popoverController: PopoverController, public mapService: MapsService) {}


  ngOnInit() {
    console.log(this.mapService.votes);
  }

  meetup() {
    this.mapService.meetup(this.userDataService.currentGroupMembers, this.map);
    // Start of TechDebt
    //setTimeout(()=> {this.mapService.meetup(this.userDataService.currentGroupMembers, this.map);}, (300))
    // End of TechDebt

    document.querySelector('ion-badge').style.display = 'block';
    console.log("Current Places: ", this.mapService.currentPlaces);
  }

  showLocationInfo(color, name) {
    if (color == 'blue') {
      this.currentLocationName = name;
      this.mapService.currentPlaces.forEach(element => {
        if (element.data.name == name) {
          this.currentWebsite = element.data.website;
          this.currentRating = element.data.rating;
          this.currentPrice = element.data.price_level;
        }
      });
      this.popup('Location');
    }
  }


  popup = async function presentPopover(type: string) {

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
    } else if (type == "Location") {
      this.locationInfoPopup = await this.popoverController.create({
        component: LocationInfoPopupComponent,
        componentProps: {
          popover: this.locationInfoPopup,
          type: 'Location',
          data: {
            name: this.currentLocationName,
            website: this.currentWebsite,
            price: this.currentPrice,
            rating: this.currentRating
          }
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.locationInfoPopup.present();
    }
  } // popup

}
