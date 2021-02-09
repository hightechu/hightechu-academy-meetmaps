import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: user = {
    username: ""
  };

  constructor(private firestore: AngularFirestore, private authService: AuthService, public router: Router) {
    if (this.authService.isAuthenticated()) {
      this.firestore.collection('users').doc<user>(this.authService.currentUserId()).valueChanges().subscribe((ref) => {
        this.user = ref;
        console.log(this.user);
      });
    } /*else {
      this.router.navigate(['/', 'user-auth']);
    }*/
  }
}
