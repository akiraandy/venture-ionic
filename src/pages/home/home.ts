import { GeolocationServiceProvider } from './../../providers/geolocation-service/geolocation-service';
import { VentureApiServiceProvider } from './../../providers/venture-api-service/venture-api-service';
import {
  GoogleMaps,
  GoogleMap,
  LatLng,
  CameraPosition,
  GoogleMapsEvent,
  MarkerOptions,
  Marker } from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: any;
  lon: any;
  ventures: any;

  constructor(public platform: Platform, public navCtrl: NavController, public googleMaps: GoogleMaps, public VPS: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    platform.ready().then(onReady => {
      GSP.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        this.loadMap();
      });
    });
  }

  ngAfterViewInit(){
    
  }

  // setLatLon(){
  //   this.lat = this.GSP.addCoord().lat
  //   this.lon = this.GSP.addCoord().lon
  // }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    let latlng = new LatLng(+this.lat, +this.lon);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: CameraPosition = {
        target: new LatLng(+this.lat, +this.lon),
        zoom: 17
      }

      this.VPS.requestVenturesNearby(this.lat, this.lon).subscribe(data => 
        data.forEach(venture => {
        let markerOptions: MarkerOptions = {position: new LatLng(+venture.latitude, +venture.longitude)}
        map.addMarker(markerOptions);
      }));
      
      map.moveCamera(position);
    });
  } 
}
