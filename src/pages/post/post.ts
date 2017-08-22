import { GeolocationServiceProvider } from './../../providers/geolocation-service/geolocation-service';
import { VentureApiServiceProvider } from './../../providers/venture-api-service/venture-api-service';

import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ListPage } from "../list/list";
import { HomePage } from './../home/home';
import { ShowPage } from './../show/show';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  private ventureForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private VASP: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    this.ventureForm = this.formBuilder.group({
      name: ['', Validators.required],
      body: ['', Validators.required],
      genre: [''],
    });
  }

  createVenture(){  
    let venture = this.ventureForm.value
    venture.latitude = this.GSP.addCoord().lat
    venture.longitude = this.GSP.addCoord().lon
    
    return venture
  }

  submitForm(){
    this.VASP.postVenture(this.createVenture());
  }

  goToPostShow(){
    this.navCtrl.push(ListPage, {
    }).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
      this.navCtrl.insert(0, HomePage);
    });
  }
}
