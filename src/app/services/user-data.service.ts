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

  groups: groupMembers[] = [];

  constructor(private firestore: AngularFirestore, private authService: AuthService, public router: Router) {
  } // constructor

  subscribeToDB() {
    if (this.authService.isAuthenticated()) {
      console.log("subscribing")
      this.firestore.collection('users').doc<user>(this.authService.currentUserId()).valueChanges().subscribe((ref) => {
        this.user = ref;
        console.log(this.user);
      });

        this.firestore.collection("groupMembers", ref => ref.where('user', '==', this.authService.currentUserId()))
        .valueChanges()
        .subscribe((query: groupMembers[]) => {
          this.groups = query;
          console.log(this.groups)
        });

    } else {
      this.router.navigate(['/', 'user-auth']);
    }
  }

  // creates a new group and then adds the current user to the group through a relationship in the "groupMembers" collection
  createGroup(groupName: string, popup) {
    // await add new group document to groups collection
    // .then add user uid AND group uid to a new document in a new collection with user uid and group uid as fields.
    this.firestore.collection("groups").add({
      name: groupName
    }).then(async (docRef) => {
      // storing group - to - user relationship in "groupMembers" collection by document id "userUID_groupUID"
      await this.firestore.collection('groupMembers').doc(this.authService.currentUserId() + "_" + docRef.id).set({
        user: this.authService.currentUserId(),
        group: docRef.id
      });
      popup.dismiss().then(() => { popup = null; });
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
  } // create group

  async getGroupName(groupID) {
    /*
    let groupName: string;
    await this.firestore.collection("groups").doc<groups>(groupID).get(ref => {
      groupName = ref.data().name;
      console.log(groupName);
    });
    console.log(groupName)
    return groupName;
    */
  }

} // user-data-service CLASS
