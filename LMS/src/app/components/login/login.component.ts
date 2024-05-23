import { Component } from '@angular/core';
import { FormControl, FormGroup, FormControlName,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SendMessageService } from 'src/app/services/send-message.service';
import { BroadcastService } from 'src/app/services/broadcast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ngOnInit() {
    // $('body').removeClass('main-content')
  }

  constructor(
    private router: Router, 
    private login: LoginService,
    private _fb : FormBuilder,
    private sm : SendMessageService,
    ) { }

  userlogin: boolean = false;
 
 
  userList: any[] = [];

  //Method Define
  loginForm : FormGroup = this._fb.group({
    userID: [''],
    password: ['']
  });
    

  loginUser() {
     console.log(this.loginForm.value)
      this.login.loginformService('users/postData', this.loginForm.value).subscribe((res: any) => {  
        // console.log(res)
        if (res.status == 200) {
          // console.log(res.data[0])  
          if (res.data[0].length >= 1) {
            this.userlogin = true;
            this.userList = res.data[0];
          }  else {
            localStorage.setItem('token', res.token)
            location.reload();
          }
        } else {
          localStorage.setItem('token', res.token)
          console.log("Wrong Id or Password")
        }
      //  console.log(res);
      })
   

  }

  usercode : any
  role(UserCode: number, UserArray: any) {
    this.usercode = UserCode;
    console.log(this.usercode);
    console.log(UserArray);
    sessionStorage.setItem("UserName", UserArray.name);
    sessionStorage.setItem("Designation", UserArray.UserTypeHin);
    sessionStorage.setItem("UserID", UserArray.userID);
    sessionStorage.setItem("UserTypeCode", UserArray.userType);
    sessionStorage.setItem("UdiseId", UserArray.UdiseCode);
    sessionStorage.setItem("MobileNo", UserArray.rmn);
    this.sendData();

    console.log(UserCode);
    if (UserCode == 2) {
      this.router.navigate(['report/leaveDashboard'])
      
    }
    else if (UserCode == 3) {
      // this.router.navigate(['state-admin/s_home'])
    }
    else if (UserCode == 4) {
      this.router.navigate(['report/leaveDashboard'])
    }
    else if (UserCode == 5) {

    }
    else if (UserCode == 10) {

    }
    else if (UserCode == 11) {

    }
    else if (UserCode == 20001) {
      this.router.navigate(['state-admin/s_home'])
    }
    else {

    }
  }

  sendData() {
    this.sm.messageEmitter.emit({
      "UserCode": this.usercode,
      "isLogin": this.login.isLoggedIn() 
    })
  }

}
