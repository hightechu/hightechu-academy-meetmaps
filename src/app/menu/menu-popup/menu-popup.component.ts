import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-menu-popup',
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss'],
})
export class MenuPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  groupName: string;

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {}

    // function that creates a new group, with the currently signed in user as the first member
    createNewGroup() {
      this.userDataService.createGroup(this.groupName, this.popover);
    }

}
