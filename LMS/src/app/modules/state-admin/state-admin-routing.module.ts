import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SHomeComponent } from './s-home/s-home.component';
import { SProfileComponent } from './s-profile/s-profile.component';
import { SApproveLeaveComponent } from './s-approve-leave/s-approve-leave.component';


const routes: Routes = [
  {path:'s_home', component: SHomeComponent},
  {path:'s_profile', component: SProfileComponent },
  {path:'s_approveleave', component: SApproveLeaveComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateAdminRoutingModule { }
