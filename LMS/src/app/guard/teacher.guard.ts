import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log(this.login.isLoggedIn());
      if (this.login.isLoggedIn()) {
        console.log(this.login.getUserCode());
        if (this.login.getUserCode() == '2' || this.login.getUserCode() == '4' || this.login.getUserCode() == '20001') {
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }else{
        this.router.navigate(['login'])
        return false;
      }
  }
  
}
