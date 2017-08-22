import { Geolocation } from '@ionic-native/geolocation';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GeolocationServiceProvider {

  public
  lat: any;
  lon: any;

  constructor(public geolocation: Geolocation) {
    let watch = this.geolocation.watchPosition({enableHighAccuracy:true});
    watch.subscribe((data) => {
      this.lat = data.coords.latitude.toString();
      this.lon = data.coords.longitude.toString();
    });
  }

  addCoord(){
    return {lat: this.lat, lon: this.lon}
  }
}
