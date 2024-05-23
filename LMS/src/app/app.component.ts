import { Component } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SendMessageService } from './services/send-message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeaveMS_Front';

  islogin: boolean = false;

  constructor( 
    private router:Router,
    private login: LoginService,
    private helper: JwtHelperService,
    private sm : SendMessageService
    )
    {}

    ngOnInit() {
      if(this.login.isLoggedIn()){
        this.islogin =this.login.isLoggedIn()
      }

      this.sm.messageEmitter.subscribe((msg:any)=>{
        this.islogin =msg.isLogin
      })
    }
}
