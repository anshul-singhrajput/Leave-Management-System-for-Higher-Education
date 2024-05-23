import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PHomeComponent } from './p-home/p-home.component';
import { PProfileComponent } from './p-profile/p-profile.component';


@NgModule({
  declarations: [
    PHomeComponent,
    PProfileComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule ,
  ]
})
export class PrincipalModule { }
