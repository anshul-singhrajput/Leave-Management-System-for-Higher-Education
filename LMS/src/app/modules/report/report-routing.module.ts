import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportLeaveApplicationStatusComponent } from './report-leave-application-status/report-leave-application-status.component';
import { ReportLeaveApplicationHistoryComponent } from './report-leave-application-history/report-leave-application-history.component';
import { ReportHolidayInformationComponent } from './report-holiday-information/report-holiday-information.component';
import { LeaveDashboardComponent } from './leave-dashboard/leave-dashboard.component';
import { PrintlvapplicationComponent } from './printlvapplication/printlvapplication.component';

const routes: Routes = [
  {path:'leaveApplicationStatus', component:ReportLeaveApplicationStatusComponent},
  {path:'ReportLeaveApplicationHistory', component:ReportLeaveApplicationHistoryComponent},
  {path:'HolidayInformationReport', component:ReportHolidayInformationComponent},
  {path:'leaveDashboard', component:LeaveDashboardComponent},
  {path:'printlvapplication', component:PrintlvapplicationComponent},
  {path:'printlvapplication/:LId', component:PrintlvapplicationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
