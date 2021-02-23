import { Component, OnInit } from '@angular/core';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';

import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.page.html',
  styleUrls: ['./user-auth.page.scss'],
})
export class UserAuthPage implements OnInit {

  signUpPopup = null;
  loginPopup = null;

  constructor(public popoverController: PopoverController, public userDataService: UserDataService, public router: Router) {
    console.log(userDataService.authState);
    if (userDataService.authState != null) {
      this.router.navigate(['/', 'menu']);
    }

  }

  ngOnInit() {
  }

  login() {

    if (this.userDataService.authState == null) {
      this.popop('Log In');
    } else {
      this.router.navigate(['/', 'menu']);
    }
  }


  popop = async function presentPopover(type: string) {

    if (type == "Sign Up") {
      this.signUpPopup = await this.popoverController.create({
        component: AuthPopupComponent,
        componentProps: {
          popover: this.signUpPopup,
          type: 'Sign Up'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.signUpPopup.present();
    } else if (type == "Log In") {
      this.loginPopup = await this.popoverController.create({
        component: AuthPopupComponent,
        componentProps: {
          popover: this.loginPopup,
          type: 'Log In'
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.loginPopup.present();
    }
  } // popup

} // user-auth class
