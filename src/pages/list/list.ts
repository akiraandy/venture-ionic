import { ShowPage } from './../show/show';
import { VentureApiServiceProvider } from './../../providers/venture-api-service/venture-api-service';
import { GeolocationServiceProvider } from './../../providers/geolocation-service/geolocation-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private ventureForm : FormGroup;

  ventureList = [];
  queryList = [];
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private VASP: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    this.getNearbyVentures();
    this.ventureForm = this.formBuilder.group({
      genre: ['']
    });
  }

  getItems(ev) {
    this.queryList = this.ventureList
    let val = ev.target.value;
    if (!val || !val.trim()) {
      return this.ventureList;
    }
    this.queryList = this.query( val )
  }

  query( params) {
    let regex = new RegExp(params, "i")
    return this.ventureList.filter(venture => venture.name.match(regex));
  }

  getNearbyVentures(){
    this.VASP.requestVenturesNearby(this.GSP.lat, this.GSP.lon).subscribe(data => {this.ventureList = data; this.queryList = data});
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
