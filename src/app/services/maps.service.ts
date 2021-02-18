import { Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { groupMembers } from './groupMembers.model';
import { pos } from './pos.model';
import { user } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  // map settings
  zoom = 12;
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

  async meetup (membersList: user[], map) {
    let center: pos = this.findCenterPos(membersList);
    this.center = center;
    this.addMarker(center, 'yellow', 'Center');
    await this.requestPlaces(map);
    console.log("FINISHED");
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

  async requestPlaces(map) {
    console.log("the map is: ", map)
    const map1 = new google.maps.Map(document.querySelector('#map'));
    const service = new google.maps.places.PlacesService(map1);

    const request = {
      location: this.center,
      radius: 2000,
      rankby: 'distance',
      type: 'restaurant',
      field: ['name', 'location']
    }

    await service.nearbySearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            console.log(results[i].name);
          }
        }
      }
    );
    console.log("DONE PLACES QUERY");

  } // requestPlaces

} // Class
