import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisclaimerContainerComponent } from './disclaimer-container.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [DisclaimerContainerComponent],
  exports: [DisclaimerContainerComponent]
})
export class DisclaimerContainerComponentModule {}
