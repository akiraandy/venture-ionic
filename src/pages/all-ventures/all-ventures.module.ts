import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllVenturesPage } from './all-ventures';

@NgModule({
  declarations: [
    AllVenturesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllVenturesPage),
  ],
})
export class AllVenturesPageModule {}
