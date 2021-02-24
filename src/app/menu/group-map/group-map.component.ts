import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { MapsService } from 'src/app/services/maps.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { InvitePopupComponent } from './invite-popup/invite-popup.component';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';
import { VotingPopupComponent } from './voting-popup/voting-popup.component';
import { GoogleMap } from '@angular/google-maps';
import { LocationInfoPopupComponent } from './location-info-popup/location-info-popup.component';
import { pos } from 'src/app/services/pos.model';
import { GroupMembersPopupComponent } from './group-members-popup/group-members-popup.component';



@Component({
  selector: 'app-group-map',
  templateUrl: './group-map.component.html',
  styleUrls: ['./group-map.component.scss'],
})
export class GroupMapComponent implements OnInit {

  // google map instance
  @ViewChild('myMap') map: GoogleMap;

  // list of popups
  invitePopup = null;
  mapFiltersPopup = null;
  leaveGroupPopup = null;
  votingPopup = null;
  locationInfoPopup = null;

  // details to be passed into location info popup
  currentLocationName = "";
  currentPos: pos = {
    lat: 0,
    lng: 0
  };
  currentRating = 0;
  currentPrice = 0;

  constructor(
    public userDataService: UserDataService,
    public popoverController: PopoverController,
    public mapService: MapsService,
    public alertCtrl: AlertController) {}


  ngOnInit() {}

  // initiates the meetup feature of the app as well as other functions that go along with it
  meetup() {
    this.mapService.meetup(this.userDataService.currentGroupMembers, this.map);
    document.getElementById('clickPin').style.display = 'block';
    console.log("Current Places: ", this.mapService.currentPlaces);
    this.mapService.zoom = 13;
    //this.popup('Voting');
  }

  // sets all the variables to be passed into the location info popup with the corrisponding details of the pin they clicked
  showLocationInfo(color, name) {
    if (color == 'blue') {
      this.currentLocationName = name;
      this.mapService.currentPlaces.forEach(element => {
        if (element.data.name == name) {
          this.currentPos = {
            lat: element.data.geometry.location.lat(),
            lng: element.data.geometry.location.lng()
          }
          console.log("current Pos", this.currentPos)
          this.currentRating = element.data.rating;
          this.currentPrice = element.data.price_level;
        }
      });
      this.popup('Location');
    }
  }

  // passes data, and a component to present as a popup based on the type sent into the function
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
    } else if (type == "Members") {
      this.groupMembersPopup = await this.popoverController.create({
        component: GroupMembersPopupComponent,
        componentProps: {
          popover: this.groupMembersPopup,
          type: 'Group Members'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.groupMembersPopup.present();
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
            pos: this.currentPos,
            price: this.currentPrice,
            rating: this.currentRating
          },
          map: this.map
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.locationInfoPopup.present();
    }
  } // popup


  // confirms that the current member wants to leave the group and removes them from the group if they confirm yes
  leaveGroup() {
    this.alertCtrl
    .create({
      header: 'Remove Group',
      message: 'Are you sure you want to permanently remove this group from your list?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.userDataService.leaveGroup();
          }
        }
      ]
    })
    .then(alertEl => {
      alertEl.present();
    });
    return false;
  } // leaveGroup


} // CLASS
