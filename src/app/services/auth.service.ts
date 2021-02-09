import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {
      this.auth.authState.subscribe( authState => {
        this.authState = authState;
      });
    } // constructor

  isAuthenticated(): boolean {
    return this.authState !== null;
  }

  currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  // Sign up with email/password
  SignUp(username, email, password, popup) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        // save user doc in users collection in firestore
        await this.firestore.collection('users').doc(result.user.uid).set({
          username: username
        });
        this.Login(email, password, popup);
      }).catch((error) => {
        window.alert(error.message)
      });
  } // signup

  // Sign in with email/password
  Login(email, password, popup) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // navigate to dashboard
         this.router.navigate(['/', 'menu']);
         // close popup
         popup.dismiss().then(() => { popup = null; });
      }).catch((error) => {
        window.alert(error.message)
      })
  } // login

  LogOut() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['/', 'user-auth']);
    })
  }

} // auth service class

