import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-invite-popup',
  templateUrl: './invite-popup.component.html',
  styleUrls: ['./invite-popup.component.scss'],
})
export class InvitePopupComponent implements OnInit {

  @Input() popover;
  @Input() type;

  invitedUser: string;

  error = "";

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {}

    // function that invites a user based on name
  async inviteUser() {
    if (await this.userDataService.searchForUser(this.invitedUser)) {
      this.userDataService.inviteUser(this.invitedUser, this.popover);
    } else {
      this.error = "User does not exist"; 
    }
  } // inviteUser

}
