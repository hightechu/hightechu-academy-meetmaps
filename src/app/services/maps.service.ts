import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

markers = []

  constructor() {
  }

  addMarker(lat:number, lng:number) {
    this.markers.push({
      position: {
        lat: lat, lng: lng,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

}
