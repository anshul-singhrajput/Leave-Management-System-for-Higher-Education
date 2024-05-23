import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaveRoutingModule } from './leave-routing.module';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { CancelLeaveComponent } from './cancel-leave/cancel-leave.component';
import { ExtendLeaveComponent } from './extend-leave/extend-leave.component';
import { JoinLeaveComponent } from './join-leave/join-leave.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ExtendLeaveIdComponent } from './extend-leave-id/extend-leave-id.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';



@NgModule({
  declarations: [
    ApplyLeaveComponent,
    CancelLeaveComponent,
    ExtendLeaveComponent,
    JoinLeaveComponent,
    ExtendLeaveIdComponent,
    ApproveLeaveComponent,
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule , ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class LeaveModule { }
