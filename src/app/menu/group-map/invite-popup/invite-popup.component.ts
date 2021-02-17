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

  inviting: boolean = true;
  invitedUser: string;

  error = "";

  constructor(public userDataService: UserDataService) {}

  ngOnInit() {}

    // function that invites a user based on name
  inviteUser() {
    this.userDataService.searchForUser(this.invitedUser).then((res) => {
      if (res != false) {
        this.userDataService.inviteUser(res);
        this.inviting = false;
        setTimeout(() => {
          this.popover.dismiss().then(() => { this.popover = null; });
        }, (2000));
      } else {
        this.error = "User does not exist";
      }
    });
  } // inviteUser

}
