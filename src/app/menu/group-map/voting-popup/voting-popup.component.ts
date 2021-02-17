import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting-popup',
  templateUrl: './voting-popup.component.html',
  styleUrls: ['./voting-popup.component.scss'],
})
export class VotingPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  constructor() { }

  ngOnInit() {}

}
