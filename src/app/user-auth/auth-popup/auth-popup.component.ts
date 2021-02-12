import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss'],
})
export class AuthPopupComponent implements OnInit {
  @Input() popover;
  @Input() type;

  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(public authService: AuthService, public userDataService: UserDataService) { }

  ngOnInit() {
  }

  async userAuth(username: string, email: string, password: string, popover, action: string) {
    let signedIn;
    let loggedIn;
    if (action == "signup") {
      signedIn = await this.authService.SignUp(username, email, password, popover);
      console.log(signedIn);
    } else {
      loggedIn = await this.authService.Login(email, password, popover);
    }

    this.userDataService.subscribeToDB();

  } // userAuth


}
