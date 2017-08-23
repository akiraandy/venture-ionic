import { ShowPage } from './../show/show';
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
import { NavController, Platform, AlertController } from 'ionic-angular';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: any;
  lon: any;
  ventures: any;

  constructor(public alertCtrl: AlertController, public platform: Platform, public navCtrl: NavController, public googleMaps: GoogleMaps, public VPS: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    platform.ready().then(onReady => {
      GSP.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        this.loadMap();
      });
    });
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    let latlng = new LatLng(+this.lat, +this.lon);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: CameraPosition = {
        target: new LatLng(+this.lat, +this.lon),
        zoom: 17
      }


    let userMarkerOptions : MarkerOptions = { position: latlng, icon: 'rgb(66, 125, 244)', title: 'You are here!'
    }
    let userMarker = map.addMarker(userMarkerOptions)

      this.VPS.requestAllVentures().subscribe(data =>
        data.forEach(venture => {
        let markerOptions: MarkerOptions = {position: new LatLng(+venture.latitude, +venture.longitude)}
        map.addMarker(markerOptions).then((marker) => {
          marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(e => {
            let uniqueVenture = this.VPS.getUniqueVenture(this.lat, this.lon, venture.id);
            uniqueVenture.subscribe(clickedVenture => {
              this.navCtrl.push(ShowPage, {
                venture: clickedVenture
              });
            });
          });
        });
      }));

      map.moveCamera(position);
    });
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: "Clicked Marker",
      message: "You clicked a marker! Congrats!",
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
