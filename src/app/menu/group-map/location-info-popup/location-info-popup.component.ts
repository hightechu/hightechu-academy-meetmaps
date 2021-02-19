import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-info-popup',
  templateUrl: './location-info-popup.component.html',
  styleUrls: ['./location-info-popup.component.scss'],
})
export class LocationInfoPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  constructor() { }

  ngOnInit() {}

}
