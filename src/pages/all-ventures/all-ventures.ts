import { GenreFilterModalPage } from './../genre-filter-modal/genre-filter-modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { ShowPage } from './../show/show';
import { VentureApiServiceProvider } from './../../providers/venture-api-service/venture-api-service';
import { GeolocationServiceProvider } from './../../providers/geolocation-service/geolocation-service';




@IonicPage()
@Component({
  selector: 'page-all-ventures',
  templateUrl: 'all-ventures.html',
})
export class AllVenturesPage {
  modal: any;
  ventureList = [];
  queryList = [];
  genres = {
    "fiction": false,
    "non-ficiton": false,
    "adventure": false,
    "comedy": false,
    "horror": false,
    "romance": false,
    "other": false
  };

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public VASP: VentureApiServiceProvider, public GSP: GeolocationServiceProvider) {
    this.getAllVentures();
  }

  openModal(){
    let modal = this.modalCtrl.create(GenreFilterModalPage, {genres: this.genres});
    modal.present();
    modal.onDidDismiss(dismiss => {
      this.getAllVentures();
    });
  }




  ionViewWillEnter(){
    this.getAllVentures();
  }

  returnSelectedGenres(){
    let selectedGenres: string = "";
    for(let genre in this.genres) {
      if (this.genres[genre]) {
        selectedGenres += genre + ","
      }
    }
    return selectedGenres;
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
    this.VASP.filterGenres(this.returnSelectedGenres()).subscribe(data => {
      this.ventureList = data;
      this.queryList = data;
    })
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

  showList(){
    console.log("STUFF");
  }

}
