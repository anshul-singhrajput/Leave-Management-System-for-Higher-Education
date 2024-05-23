import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { CancelLeaveComponent } from './cancel-leave/cancel-leave.component';
import { ExtendLeaveComponent } from './extend-leave/extend-leave.component'; 
import { ExtendLeaveIdComponent } from './extend-leave-id/extend-leave-id.component';
import { JoinLeaveComponent } from './join-leave/join-leave.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';

const routes: Routes = [
  {path:'applyLeave', component:ApplyLeaveComponent},
  {path:'cancelLeave', component:CancelLeaveComponent},
  {path:'extendLeave', component:ExtendLeaveComponent},
  {path:'extendLeaveid/:ApplicationId', component:ExtendLeaveIdComponent},
  {path:'joinLeave', component:JoinLeaveComponent},
  {path:'approveLeave', component:ApproveLeaveComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
