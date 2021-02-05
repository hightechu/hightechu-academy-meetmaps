import { Component, OnInit } from '@angular/core';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';

import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.page.html',
  styleUrls: ['./user-auth.page.scss'],
})
export class UserAuthPage implements OnInit {

  loginPopup = null;
  signUpPopup = null;

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {
  }


  popop = async function presentPopover(type: string) {

    if (type == "Sign Up") {
      this.signUpPopup = await this.popoverController.create({
        component: AuthPopupComponent,
        componentProps: {
          popup: this.loginPopup,
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
          popup: this.loginPopup,
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
