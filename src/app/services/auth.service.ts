import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {}


  // Sign up with email/password
  SignUp(username, email, password, popup) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        // save user doc in users collection in firestore with the username and unique ID
        await this.firestore.collection('users').doc(result.user.uid).set({
          username: username,
          uid: result.user.uid
        });
        this.Login(email, password, popup);
      }).catch((error) => {
        window.alert(error.message)
      });
  } // signup

  // Log in with email/password
  Login(email, password, popup) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // close popup
        popup.dismiss().then(() => { popup = null; });
         console.log("Logged In")
      }).catch((error) => {
        window.alert("login error: " + error.message)
      })
  } // login

  // log the user out and navigate them back to the signup/login page
  LogOut() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['/', 'user-auth']);
    }).catch((error) => {
      window.alert("logout error: " + error.message)
    })
  } // logout

} // auth service class

