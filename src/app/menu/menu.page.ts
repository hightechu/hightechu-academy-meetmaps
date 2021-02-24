import { Component, OnInit } from '@angular/core';

import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pageName: string = "My Groups";

  tutorialPopup = null;

  constructor(public userDataService: UserDataService, public AuthService: AuthService, public router: Router, public popoverController: PopoverController) {
    if (userDataService.authState == null) {
      this.router.navigate(['/', 'user-auth']);
    }
  }

  ngOnInit() {
    this.popup()
  }

  changePage(page: string) {
    this.userDataService.currentComponent = page;
    switch (page) {
      case "inbox": this.pageName = "Pending Invites"; break;
      case "group-map": this.pageName = this.userDataService.currentGroup.name; break;
      default: this.pageName = "My Groups";
    }
  }

  Logout() {
    this.userDataService.authState = null;
    this.userDataService.reset();
    this.AuthService.LogOut();
  }

  goto () {
        window.open("https://github.com/hightechu/hightechu-academy-meetmaps", '_blank');
  }

  popup = async function presentPopover() {
      this.tutorialPopup = await this.popoverController.create({
        component: TutorialComponent,
        componentProps: {
          popover: this.tutorialPopup
        },
        cssClass: 'my-custom-popup',
        translucent: true,
        backdropDismiss: true
      });
      return await this.tutorialPopup.present();
    }

}
