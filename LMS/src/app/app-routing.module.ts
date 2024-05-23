import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { SidebarComponent } from './Core/sidebar/sidebar.component';
import { HeaderComponent } from './Core/header/header.component';
import { FooterComponent } from './Core/footer/footer.component';
import { TeacherGuard } from './guard/teacher.guard';
import { UpdatePasswordComponent } from './password/update-password/update-password.component';

const routes: Routes = [
  // {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'sidebar', component:SidebarComponent},
  {path:'header', component:HeaderComponent},
  {path:'footer', component:FooterComponent},
  {path:'updatePassword', component:UpdatePasswordComponent},
  

  //Lazy loading
  {path: 'leave', loadChildren:()=> import('./modules/leave/leave.module').then(m=>m.LeaveModule),canActivate:[TeacherGuard]},
  {path: 'teacher', loadChildren:()=> import('./modules/teacher/teacher.module').then(m=>m.TeacherModule),canActivate:[TeacherGuard]},
  {path: 'report', loadChildren:()=> import('./modules/report/report.module').then(m=>m.ReportModule),canActivate:[TeacherGuard]},
  {path: 'principal', loadChildren:()=> import('./modules/principal/principal.module').then(m=>m.PrincipalModule),canActivate:[TeacherGuard]},
  {path: 'state-admin', loadChildren:()=> import('./modules/state-admin/state-admin.module').then(m=>m.StateAdminModule),canActivate:[TeacherGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
