import { Component, OnInit } from '@angular/core';

import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pageName: string = "My Groups";

  constructor(public userDataService: UserDataService, public AuthService: AuthService, public router: Router) {
    if (userDataService.authState == null) {
      this.router.navigate(['/', 'user-auth']);
    }
  }

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
    this.userDataService.authState = null; 
    this.userDataService.reset();
    this.AuthService.LogOut();
  }

}
