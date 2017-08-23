import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenreFilterModalPage } from './genre-filter-modal';

@NgModule({
  declarations: [
    GenreFilterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GenreFilterModalPage),
  ],
})
export class GenreFilterModalPageModule {}
