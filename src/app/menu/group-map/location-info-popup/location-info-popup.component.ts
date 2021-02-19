import { Component, Input, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-location-info-popup',
  templateUrl: './location-info-popup.component.html',
  styleUrls: ['./location-info-popup.component.scss'],
})
export class LocationInfoPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;
  @Input() data;
  @Input() map;

  constructor(public mapService: MapsService, public userDataService: UserDataService) { }

  ngOnInit() {}

  toDollar(): string {
    let dollar = "";
    for (let i = 0; i < this.data.price; i++) {
      dollar += "$";
    }
    return dollar;
  }

  directMe() {
    this.mapService.directions(this.userDataService.user.pos, this.data.pos, this.map);
    this.popover.dismiss().then(() => { this.popover = null; });
  }

}
