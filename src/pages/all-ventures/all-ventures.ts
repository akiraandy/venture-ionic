import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShowPage } from './../show/show';
import { VentureApiServiceProvider } from './../../providers/venture-api-service/venture-api-service';
import { GeolocationServiceProvider } from './../../providers/geolocation-service/geolocation-service';

@IonicPage()
@Component({
  selector: 'page-all-ventures',
  templateUrl: 'all-ventures.html',
})
export class AllVenturesPage {
  ventureList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public VASP: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    this.getAllVentures();
  }

  getAllVentures(){
    this.VASP.requestAllVentures().subscribe(data => this.ventureList = data);
  }

  ventureTapped(event, venture) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ShowPage, {
      venture: venture
    });
  }

  doRefresh(refresher){
    this.ventureList = [];
    this.getAllVentures();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
