import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-info-popup',
  templateUrl: './location-info-popup.component.html',
  styleUrls: ['./location-info-popup.component.scss'],
})
export class LocationInfoPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;
  @Input() data;

  constructor() { }

  ngOnInit() {}

  toDollar(): string {
    let dollar = "";
    for (let i = 0; i < this.data.price; i++) {
      dollar += "$";
    }
    return dollar; 
  }

}
