import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss'],
})
export class FilterPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  constructor() { }

  ngOnInit() {}
}
