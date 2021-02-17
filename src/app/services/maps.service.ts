import { Injectable } from '@angular/core';
import { groupMembers } from './groupMembers.model';
import { pos } from './pos.model';
import { user } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  // map settings
  zoom = 14;
  center: pos;
  options = {};

  // array of all markers on the map
  markers = [];

  currentPlaces = [];

  constructor() {}


  addMarker(pos: pos, color: string, name: string) {
    this.markers.push({
      position: pos,
      label: {
        color: 'black',
        text: name,
      },
      options: { icon: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png" },
    });
  } // add marker

  meetup (membersList: user[]) {
    let center: pos = this.findCenterPos(membersList);
    this.center = center; 
    this.addMarker(center, 'yellow', 'Center');
  } // meetup

  findCenterPos (membersList: user[]): pos {
    const numUsers = membersList.length;
    let totalLat = 0;
    let totalLng = 0;

    membersList.forEach(user => {
      totalLat += user.pos.lat;
      totalLng += user.pos.lng;
    });

    totalLat /= numUsers;
    totalLng /= numUsers;
    let pos: pos = {
      lat: totalLat,
      lng: totalLng
    };

    return pos;

  } // findcenterpos

  requestPlaces() {
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?AIzaSyDFs6WGEiVEL5jdSo_cjNh2sgeTINE7bQA&")
  }

} // Class
