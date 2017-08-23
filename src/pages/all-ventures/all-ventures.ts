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
  queryList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public VASP: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    this.getAllVentures();
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

  getAllVentures(){
    this.VASP.requestAllVentures().subscribe(data => {
      this.ventureList = data;
      this.queryList = data;
    })
  }

  
  getGenreSegments() {
    // genre id param instead of hard code
    this.VASP.getGenres("9").subscribe(data => {
      console.log(data);
    });
  }

  ventureTapped(event, id) {
    let lat = this.GSP.addCoord().lat;
    let lon = this.GSP.addCoord().lon;
    let uniqueVenture = this.VASP.getUniqueVenture(lat, lon, id);
    uniqueVenture.subscribe(venture => {
      this.navCtrl.push(ShowPage, {
        venture: venture
      });
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
