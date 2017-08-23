import {
  GoogleMaps,
  GoogleMap,
  LatLng,
  CameraPosition,
  GoogleMapsEvent,
  Marker,
  MarkerOptions } from '@ionic-native/google-maps';
import { VentureApiServiceProvider } from './../../providers/venture-api-service/venture-api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {
  id: string;
  name: string;
  body: string;
  lat: string;
  lon: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private VASP: VentureApiServiceProvider, public googleMaps: GoogleMaps) {
    this.setView(navParams.get('venture'));
  }

  setView(data){
    this.id = data.id;
    this.name = data.name;
    this.body = data.body;
    this.lat = data.latitude;
    this.lon = data.longitude;
  }

  ngAfterViewInit(){
    this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    let latlng = new LatLng(+this.lat, +this.lon);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: CameraPosition = {
        target: latlng,
        zoom: 17
      }
      map.moveCamera(position);
      map.addMarker({
        position: latlng,
        title: this.name
      });
    });
  } 

}
