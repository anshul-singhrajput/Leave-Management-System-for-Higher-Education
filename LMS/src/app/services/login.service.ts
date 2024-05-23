import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { config } from '../config'; 
import { map, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient , private router: Router,private helper: JwtHelperService, ) { }

    //login form service
    loginformService(loginData : any , data: any){
      return this.http.post(config.apiUrl + loginData , data).pipe(map((res:any) =>{
        if(res && res.token){
          localStorage.setItem('token', res.token)
        }
        return res;
      })); 
    }

    isLoggedIn(): boolean {
      if (localStorage.getItem('token')) {
        return true
      } else {
        return false       
      }
    }

//     autologout(expire: number){
// setTimeout(() => {
// this.logout();

// }, expire )
//     }

    logout() {
      localStorage.removeItem('token')
      sessionStorage.clear();
      location.reload();
     
    }

    getUserCode() {
      return sessionStorage.getItem('UserTypeCode');
    }
    
    // tokenexpire (){
    //   const token = localStorage.getItem('token');
    //   return !this.helper.isTokenExpired(token);
    // }


}
