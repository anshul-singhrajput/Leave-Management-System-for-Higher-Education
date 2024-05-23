import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateAdminRoutingModule } from './state-admin-routing.module';
import { SHomeComponent } from './s-home/s-home.component';
import { SProfileComponent } from './s-profile/s-profile.component';
import { SApproveLeaveComponent } from './s-approve-leave/s-approve-leave.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; //For State Admin Home full calendar

// Material
import {NgChartsModule} from 'ng2-charts' //for pie chart
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    SHomeComponent,
    SProfileComponent ,
    SApproveLeaveComponent
  ],
  imports: [
    CommonModule,
    StateAdminRoutingModule,
    NgChartsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule ,
    FullCalendarModule ,
  ]
})
export class StateAdminModule { }
