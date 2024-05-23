import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  tokenData: any;
  broadcastMsg: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private helper: JwtHelperService) {
    this.tokenData = localStorage.getItem('token');
    if (!this.helper.isTokenExpired(this.tokenData)) {
      this.tokenData = this.helper.decodeToken(this.tokenData)
      // console.log(this.tokenData.isLogin)
    }
   }

   IsLogin(body:any){
    this.broadcastMsg.next(body)
  }

  userLoggedOut(body:any){
    this.broadcastMsg.next(body)
  }
}
