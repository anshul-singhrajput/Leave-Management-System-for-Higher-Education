import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportLeaveApplicationStatusComponent } from './report-leave-application-status/report-leave-application-status.component';
import {NgChartsModule} from 'ng2-charts' //for pie chart
import { FullCalendarModule } from '@fullcalendar/angular'; //For leave Dashboard full calendar

// Material
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { ReportLeaveApplicationHistoryComponent } from './report-leave-application-history/report-leave-application-history.component';
import { ReportHolidayInformationComponent } from './report-holiday-information/report-holiday-information.component';
import { LeaveDashboardComponent } from './leave-dashboard/leave-dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { PrintlvapplicationComponent } from './printlvapplication/printlvapplication.component';

@NgModule({
  declarations: [
    ReportLeaveApplicationStatusComponent,
    ReportLeaveApplicationHistoryComponent,
    ReportHolidayInformationComponent,
    LeaveDashboardComponent,
    PrintlvapplicationComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatIconModule,
    MatTabsModule,
    NgChartsModule,
    MatButtonModule,
    FullCalendarModule,
  ]
})
export class ReportModule { }
