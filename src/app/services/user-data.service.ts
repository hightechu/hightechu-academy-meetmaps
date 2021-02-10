import { QueryValueType } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { groupMembers } from './groupMembers.model';
import { groups } from './groups.model';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: user = {
    username: ""
  };

  groups: groups[] = [];

  currentComponent: string = 'group-list';

  currentGroup: groups = null;

  constructor(private firestore: AngularFirestore, private authService: AuthService, public router: Router) {} // constructor

  subscribeToDB() {
    // listen for changes to firestore if a user is signed in, and route them to the sign in page if they aren't
    if (this.authService.isAuthenticated()) {
      console.log("subscribing")

      // listen for changes in the current users document, and updated the local user based on those changes
      this.firestore.collection('users').doc<user>(this.authService.currentUserId()).valueChanges().subscribe((ref) => {
        this.user = ref;
        console.log(this.user);
      });

      // listen for changes in the groups collection, and update the local groups array based on firestore changes
      this.firestore.collection("groups", ref => ref.where('users', 'array-contains-any', [this.authService.currentUserId()]))
        .valueChanges()
        .subscribe((query: groups[]) => {
          this.groups = query;
          console.log(this.groups)
        });
    } else {
      this.router.navigate(['/', 'user-auth']);
    }
  } // subscribeToDB

  getGroupFromUid(groupUid: string): groups {
    for (var i=0; i < this.groups.length; i++) {
      if (this.groups[i].groupUid === groupUid) {
          return this.groups[i];
      } // if groupUid of group equals the one passed in, return it
    } // loop through each element of groups
  } // getGroupFromUid


  createGroup(groupName: string, popup) {
    // adds the entered name, current user, and groupUid to a new group document in the firestore collection "groups"
    this.firestore.collection("groups").add({
      name: groupName,
      users: [this.authService.currentUserId()]
    }).then(async (docRef) => {
      await this.firestore.collection('groups').doc(docRef.id).update({groupUid: docRef.id});
      popup.dismiss().then(() => { popup = null; });
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
  } // create group

  async searchForUser(searchKey: string) {
    let isUserExist= false;
    console.log(searchKey)
    if (searchKey == undefined) {
      return false;
    }
    //INVALID PERMISSIONS ---------------------------------------
    /*
    await this.firestore.collection('users', ref => ref.where('username', '==', searchKey))
    .valueChanges()
    .subscribe((query) => {
      if (query.length != 0) {
        isUserExist = true;
      }
    });
    */
    // search for user in name
    return isUserExist;
  }

  inviteUser(user: string, popup) {
    // add
    popup.dismiss().then(() => { popup = null; });
  }

} // user-data-service CLASS
