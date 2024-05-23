import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PHomeComponent } from './p-home/p-home.component';
import { PProfileComponent } from './p-profile/p-profile.component';


const routes: Routes = [
  {path:'p_home', component:  PProfileComponent},
  {path:'p_profile', component: PHomeComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
