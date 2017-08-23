import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-genre-filter-modal',
  templateUrl: 'genre-filter-modal.html',
})
export class GenreFilterModalPage {
  genres = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.genres = navParams.get("genres");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }



}
