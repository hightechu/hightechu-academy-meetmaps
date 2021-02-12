import { Component, OnInit } from '@angular/core';

import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pageName: string = "My Groups";

  constructor(public userDataService: UserDataService, public AuthService: AuthService) { }

  ngOnInit() {
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
    this.userDataService.reset();
    this.AuthService.LogOut();
    console.log(this.AuthService.authState);
  }

}
