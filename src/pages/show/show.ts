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

  constructor(public navCtrl: NavController, public navParams: NavParams, private VASP: VentureApiServiceProvider) {
    this.venture().subscribe(data => this.setView(data));
  }

  venture(){
    console.log(this.navParams);
    return this.VASP.getUniqueVenture(this.navParams.get('venture').latitude, this.navParams.get('venture').longitude, this.navParams.get('venture').id)
  }

  setView(data){
    this.id = data.id;
    this.name = data.name;
    this.body = data.body;
    this.lat = data.latitude;
    this.lon = data.longitude;
  }

}
