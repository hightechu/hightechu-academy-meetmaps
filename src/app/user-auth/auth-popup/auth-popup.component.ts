import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss'],
})
export class AuthPopupComponent implements OnInit {
  @Input() popup;
  @Input() type;

  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor() { }

  ngOnInit() {}

}
