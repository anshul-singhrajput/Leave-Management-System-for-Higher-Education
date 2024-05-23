import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainHeaderComponent } from './Core/main-header/main-header.component';
import { HomeComponent } from './components/home/home.component';
import { MainFooterComponent } from './Core/main-footer/main-footer.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveRoutingModule } from './modules/leave/leave-routing.module';
import { SidebarComponent } from './Core/sidebar/sidebar.component';
import { HeaderComponent } from './Core/header/header.component';
import { FooterComponent } from './Core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt'; //token
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular'; //For leave Dashboard full calendar
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UpdatePasswordComponent } from './password/update-password/update-password.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainHeaderComponent,
    HomeComponent,
    MainFooterComponent,
    AboutComponent,
    ContactComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    LeaveRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token')
        }
      }
    }),
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    NgChartsModule,
    CarouselModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
