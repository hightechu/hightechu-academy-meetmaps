import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {

  @Input() popover;

  constructor() { }

  ngOnInit() {}

  close () {
    this.popover.dismiss().then(() => { this.popover = null; });
  }

}
