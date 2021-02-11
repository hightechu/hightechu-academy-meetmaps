import { QueryValueType } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

// services
import { AuthService } from './auth.service';

// data models
import { invites } from './invites.model';
import { groups } from './groups.model';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: user = {
    userUid: "",
    username: ""
  };

  groups: groups[] = [];

  invites: invites[] = [];

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
        console.log("current user", this.user);
      });

      // listen for changes in the groups collection, and update the local groups array based on firestore changes
      this.firestore.collection("groups", ref => ref.where('users', 'array-contains-any', [this.authService.currentUserId()]))
        .valueChanges()
        .subscribe((query: groups[]) => {
          this.groups = query;
          console.log("groups: ", this.groups)
        });

        // listen for changes in the invites collection, and update the invites based on firestore changes
      this.firestore.collection("invites", ref => ref.where('toUser', '==', this.authService.currentUserId()))
      .valueChanges()
      .subscribe((query: invites[]) => {
        this.invites = query;
        console.log("invites: ", this.invites)
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

    if (searchKey == undefined) {
      return false;
    }
    // searches users collection for username equal to search key
    let query = await this.firestore.collection('users', ref => ref.where('username', '==', searchKey))
    .get()
    .toPromise()
    .then((res) => {
      if (!res.empty) {
        return res.docs[0].ref.id;
      } else {
        return false;
      }
    });

    return query;
  } // searchForUser

  inviteUser(user: string, popup) {
    console.log("InviteUser" + user);

    this.firestore.collection("invites").add({
      toUser: user,
      fromUser: this.user.username,
      fromGroupUid: this.currentGroup.groupUid,
      fromGroupName: this.currentGroup.name
    });

    popup.dismiss().then(() => { popup = null; });
  }

} // user-data-service CLASS
