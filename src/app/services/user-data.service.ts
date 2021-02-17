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
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  user: user = {
    userUid: "",
    username: "",
    pos: {
      lat: 0,
      lng: 0
    }
  };

  groups: groups[] = [];

  invites: invites[] = [];

  currentComponent: string = 'group-list';

  currentGroup: groups = null;
  currentGroupMembers: user[] = null;

  userSubscription: Subscription = null;
  groupSubscription: Subscription = null;
  groupMembersSubscriptions: Subscription[] = [];
  inviteSubscription: Subscription = null;

  authState;

  constructor(private firestore: AngularFirestore,
    public router: Router,
    private auth: AngularFireAuth) {
      this.subscribeToAuthState();
    } // constructor

  subscribeToAuthState() {
    this.auth.authState.subscribe( authState => {
      this.authState = authState;
      console.log(this.authState);
      if (this.isAuthenticated()) {
        this.subscribeToDB();
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authState !== null;
  }

  currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  subscribeToDB() {
    //console.log("Is signed in: " + this.authService.isAuthenticated());

    // listen for changes to firestore if a user is signed in, and route them to the sign in page if they aren't
    if (this.isAuthenticated()) {
      console.log("subscribing")

      // get's the users position and updates it in the firebase
      this.getUserPos();

      // listen for changes in the current users document, and updated the local user based on those changes
      this.userSubscription = this.firestore.collection('users').doc<user>(this.currentUserId())
      .valueChanges()
      .subscribe((ref) => {
        this.user = ref;
        console.log("current user", this.user);
      });

      // listen for changes in the groups collection, and update the local groups array based on firestore changes
      this.groupSubscription = this.firestore.collection("groups", ref => ref.where('users', 'array-contains-any', [this.currentUserId()]))
        .valueChanges()
        .subscribe((query: groups[]) => {
          this.groups = query;
          console.log("groups: ", this.groups)
        });

        // listen for changes in the invites collection, and update the invites based on firestore changes
      this.inviteSubscription = this.firestore.collection("invites", ref => ref.where('toUser', '==', this.currentUserId()))
      .valueChanges()
      .subscribe((query: invites[]) => {
        this.invites = query;
        console.log("invites: ", this.invites)
      });

      this.router.navigate(['/', 'menu']);
    }  else {
      this.router.navigate(['/', 'user-auth']);
    }
  } // subscribeToDB

  // get's the current users position and updates the firebase
  getUserPos() {
    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log("Lat: "+ pos.lat + " Lng: " + pos.lng);
            this.firestore.collection('users').doc(this.currentUserId()).update({pos: pos});
          }
        );
      } catch (error) {
        alert("Encourered Error:" + error);
      }
    } else {
      // Browser doesn't support Geolocation
      alert("Your browser doesn't support Geolocation")
    } // if/else
  } // getUserPos

  // once a currentgroup exists, a subscription is made to the members of the group
  SubscribeToGroupMembers() {
    if (this.currentGroup !== null) {
      this.currentGroupMembers = [];
      // listen for changes in the current groups users data and updates the currentGroupMembers array accordingly.
      for (let i = 0; i < this.currentGroup.users.length; i++) {
        this.groupMembersSubscriptions[i] = this.firestore.collection('users').doc<user>(this.currentGroup.users[i])
        .valueChanges()
        .subscribe((ref) => {
          this.currentGroupMembers.push(ref);
          console.log("user " + i + ": " + ref.username);
        });
      } // for each user in the group
    } // if current group is defined

    console.log("groupMembers: ", this.currentGroupMembers);
  } // subscribeToGroupMembers

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
      users: [this.currentUserId()]
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
    }).then(async (docRef) => {
      await this.firestore.collection('invites').doc(docRef.id).update({inviteUid: docRef.id});
      popup.dismiss().then(() => { popup = null; });
    });
  } // inviteUser

  async inviteAction(invite: invites, action: string) {
    if (action == "accept") {
      let usersArray = await this.firestore.collection('groups').doc<groups>(invite.fromGroupUid).get().toPromise().then((docRef) => {
        return docRef.data().users;
      });
      usersArray.push(this.currentUserId());

      this.firestore.collection('groups').doc<groups>(invite.fromGroupUid).update({
        users: usersArray
      });
    } // if we're accepting invite

   this.firestore.collection('invites').doc(invite.inviteUid).delete();

  } // inviteAction

  // resets all variables
  reset() {
    this.userSubscription.unsubscribe();
    this.groupSubscription.unsubscribe();
    this.inviteSubscription.unsubscribe();

    this.user= {
      userUid: "",
      username: "",
      pos: {
        lat: 0,
        lng: 0
      }
    };

    this.groups = [];
    this.invites= [];
    this.currentComponent = 'group-list';
    this.currentGroup = null;

  } //reset

} // user-data-service CLASS
