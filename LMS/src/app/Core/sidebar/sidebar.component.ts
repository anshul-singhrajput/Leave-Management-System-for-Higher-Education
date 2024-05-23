import { Component } from '@angular/core';
import { menu } from 'src/app/models/models/constant.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    // Variables
    Role: string | null = "";
    ishm: string | null = "";
    menu: any[] = [];
    submenu: any[] = [];

    ngOnInit(): void {
      
      if (sessionStorage.getItem("UserTypeCode")) {
        this.Role = sessionStorage.getItem("UserTypeCode");
        // console.log(this.Role)
        this.ishm = sessionStorage.getItem("IsHM");
        //console.log(this.ishm);
        this.submenu = menu.submenu;
        // this.submenu[4].isactive = true;
        
      }
      if (this.Role == "2") {
        this.menu = menu.teachermenu;
      }
      else if (this.Role == "20001") {
        this.menu = menu.StateAdminmenu;
      }
      else if (this.Role == "4"){
        this.menu = menu.Principalmenu;
      }
    }

    

}
