import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VentureApiServiceProvider {

  private
  
  url: string = "https://venture-ionic-api.herokuapp.com/segments";

  constructor(public http: Http) {
  }

  requestAllVentures(){
    return this.http.get(this.url)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  requestVenturesNearby(lat: string, lon: string){
    let queryString = '/nearby?' + 'latitude=' + lat + '&longitude=' + lon
    return this.http.get(this.url + queryString)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  getUniqueVenture(lat: string, lon: string, id: string){
    let queryString = '/' + id + "/?" + 'latitude=' + lat + '&longitude=' + lon
    return this.http.get(this.url + queryString)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  postVenture(venture: any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, JSON.stringify(venture), {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
    });
  }

  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private logResponse(res: Response){
    console.log(res);
  }

  private extractData(res: Response){
    return res.json();
  }

}
