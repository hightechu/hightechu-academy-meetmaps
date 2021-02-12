import { Component, OnInit } from '@angular/core';

import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public userDataService: UserDataService, public AuthService: AuthService) { }

  ngOnInit() {
  }

  changePage(page: string) {
    this.userDataService.currentComponent = page;
  }

  Logout() {
    this.userDataService.reset();
    this.AuthService.LogOut();
    console.log(this.AuthService.authState);
  }

}
