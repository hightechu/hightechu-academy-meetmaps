import { Component, Input, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-voting-popup',
  templateUrl: './voting-popup.component.html',
  styleUrls: ['./voting-popup.component.scss'],
})
export class VotingPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  constructor(public mapService: MapsService, public userDataService: UserDataService) { }

  ngOnInit() {
  }

  submitVote(type: string) {
    if (type == 'change') {
      this.retractVote();
    } else {

      console.log(this.mapService.currentPlaces);
      document.querySelector('ion-badge').style.display = 'none';
    }
    //this.userDataService.updateVotes();
  }

  hasVoted(): boolean {
    this.mapService.currentPlaces.forEach(element => {
      if (element.voted == true) {
        return true;
      }
    });
    return false;
  } // hasVoted

  retractVote() {
    this.mapService.currentPlaces.forEach(element => {
      element.voted = false;
    });
  }
}
