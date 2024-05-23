import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  name:any;
  Designation:any;

  ngOnInit():void {
    this.name =  sessionStorage.getItem('UserName');
    this.Designation =  sessionStorage.getItem('Designation');
}

  constructor( private router:Router , private login: LoginService ){}

  logout() {
    this.login.logout();
  }


}
