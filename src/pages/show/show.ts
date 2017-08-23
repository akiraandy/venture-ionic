import { GeolocationServiceProvider } from './../../providers/geolocation-service/geolocation-service';
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
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';



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
  userLat: number;
  userLon: number;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private VASP: VentureApiServiceProvider, public googleMaps: GoogleMaps, public GSP: GeolocationServiceProvider, public loadingCtrl: LoadingController) {
    this.setView(navParams.get('venture'));
    this.presentLoading();

    platform.ready().then(onReady => {
      GSP.geolocation.getCurrentPosition().then((resp) => {
        this.userLat = resp.coords.latitude;
        this.userLon = resp.coords.longitude;
        this.loadMap();

      });
    });
  }

  setView(data){
    this.id = data.id;
    this.name = data.name;
    this.body = data.body;
    this.lat = data.latitude;
    this.lon = data.longitude;
  }

  ngAfterViewInit(){
    // this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    let latlng = new LatLng(+this.lat, +this.lon);
    let userLatlng = new LatLng(this.userLat, this.userLon);


    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: CameraPosition = {
        target: latlng,
        zoom: 17
      }

    let userMarker : MarkerOptions = { position: userLatlng, icon: 'rgb(66, 125, 244)', title: 'You are here!'
    }


    map.addMarker(userMarker)

      map.moveCamera(position);
      map.addMarker({
        position: latlng,
        title: this.name
      });
    });
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

}
