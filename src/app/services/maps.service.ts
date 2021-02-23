import { Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { groupMembers } from './groupMembers.model';
import { place } from './place.model';
import { pos } from './pos.model';
import { user } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  // map settings
  zoom = 11;
  center: pos;
  options = {};

  locationType = 'restaurant';

  // array of all markers on the map
  markers = [];

  currentPlaces: place[] = [];

  constructor() {}


  addMarker(pos: pos, color: string, name: string) {
    this.markers.push({
      position: pos,
      label: {
        color: 'black',
        text: name,
      },
      options: { icon: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png" },
      color: color
    });
    //console.log("added marker: " + name)
  } // add marker

  removeMarker(color: string) {
    this.markers = this.removeByKey(this.markers, color);
  }

  async meetup (membersList: user[], map: GoogleMap) {
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

  async requestPlaces(map: GoogleMap) {
    console.log("the map is: ", map.googleMap);
    const service = new google.maps.places.PlacesService(map.googleMap);

    const request = {
      location: this.center,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: this.locationType,
      field: ['name', 'location', 'price', 'website', 'rating']
    }

    // remove all current places markers
    this.markers = this.removeByKey(this.markers, 'blue');
    this.currentPlaces = [];

    service.nearbySearch(
      request,
       (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < 5; i++) {
            let pos: pos = {
              lat: results[i].geometry.location.lat(),
              lng: results[i].geometry.location.lng()
            }
            console.log(results[i].name + " -- ", pos);
            this.addMarker(pos, 'blue', results[i].name);
            this.currentPlaces.push({
              data: results[i],
              voted: false,
              totalVotes: 0
            });
          } // for the 5 places
        } // if status is OK and there are valid results
      } // callback
    );
    console.log("DONE PLACES QUERY");

  } // requestPlaces

  removeByKey(arr, propertyValue) {

    return arr.filter(item => item.color !== propertyValue);

  } // removeByKey


  directionRenderer = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  directions(startPos: pos, endPos: pos, map: GoogleMap) {
    const request = {
      origin: startPos,
      destination: endPos,
      travelMode: google.maps.TravelMode.DRIVING
  };



  this.directionRenderer.setMap(null);

  this.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        this.directionRenderer.setDirections(response);
      } else {
          window.alert('Directions request failed due to ' + status);
      }
  });
  this.directionRenderer.setMap(map.googleMap);

  }

} // Class
