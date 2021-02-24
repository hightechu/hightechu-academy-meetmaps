import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-group-members-popup',
  templateUrl: './group-members-popup.component.html',
  styleUrls: ['./group-members-popup.component.scss'],
})
export class GroupMembersPopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {

    console.log("Group Members Array:", this.userDataService.currentGroupMembers);

  }

}
