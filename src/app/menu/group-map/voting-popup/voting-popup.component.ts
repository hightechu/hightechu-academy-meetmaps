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
    if (this.userDataService.currentGroup.votes) {
      for (let i = 0; i < this.userDataService.currentGroup.votes.length; i++) {
        this.mapService.currentPlaces[i].totalVotes = this.userDataService.currentGroup.votes[i];
      }
    }
  }

  submitVote(type: string) {
    if (type == 'change') {
      this.mapService.hasVoted = false;
    } else {

      this.mapService.hasVoted = true;

      this.mapService.currentPlaces.forEach(element => {
        if (element.voted == true) {
          element.totalVotes++;
        }
      });

      for (let i = 0; i < this.mapService.currentPlaces.length; i++) {
        if (this.mapService.currentPlaces[i].voted == true) {
          this.mapService.votes[i]++;
        }
      }

      console.log(this.mapService.currentPlaces);
      document.querySelector('ion-badge').style.display = 'none';
      this.userDataService.hasVoted();
    }
    this.userDataService.updateVotes();
  }
}
