import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {}

  acceptInvite(groupUid: string) {

  }

  declineInvite(groupUid: string) {

  }

}
