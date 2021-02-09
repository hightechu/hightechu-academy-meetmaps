import { Component, OnInit } from '@angular/core';

import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public UserDataService: UserDataService, public AuthService: AuthService) { }

  page: string = "groupList";

  ngOnInit() {
   this.userDataService.subscribeToDB(); 
  }

  changePage(page: string) {
    this.page = page;
  }

}
