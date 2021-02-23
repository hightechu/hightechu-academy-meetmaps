import { Component, Input, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss'],
})
export class FilterPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  constructor(public mapsService: MapsService) { }

  ngOnInit() {}
}
