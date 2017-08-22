import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PostPage } from '../pages/post/post';
import { ShowPage } from '../pages/show/show';
import { AllVenturesPage } from './../pages/all-ventures/all-ventures';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { GeolocationServiceProvider } from '../providers/geolocation-service/geolocation-service';
import { VentureApiServiceProvider } from '../providers/venture-api-service/venture-api-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PostPage,
    ShowPage,
    AllVenturesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PostPage,
    ShowPage,
    AllVenturesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeolocationServiceProvider,
    VentureApiServiceProvider,
    GoogleMaps,
    Geolocation
  ]
})
export class AppModule {}
