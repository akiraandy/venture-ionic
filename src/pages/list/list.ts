import { GoogleMaps, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { ShowPage } from './../show/show';
import { VentureApiServiceProvider } from './../../providers/venture-api-service/venture-api-service';
import { GeolocationServiceProvider } from './../../providers/geolocation-service/geolocation-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  ventureList = [];
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private VASP: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    this.getNearbyVentures();
  }

  getNearbyVentures(){
    this.VASP.requestVenturesNearby(this.GSP.lat, this.GSP.lon).subscribe(data => this.ventureList = data);
  }

  ventureTapped(event, venture) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ShowPage, {
      venture: venture
    });
  }

  doRefresh(refresher){
    this.ventureList = [];
    this.getNearbyVentures();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
