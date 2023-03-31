import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisplayProfilesPage } from './display-profiles-tab.page';
import { DisclaimerContainerComponentModule } from '../disclaimer-container/disclaimer-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DisclaimerContainerComponentModule,
    RouterModule.forChild([{ path: '', component: DisplayProfilesPage }])
  ],
  declarations: [DisplayProfilesPage]
})
export class DisplayProfilesPageModule {}
