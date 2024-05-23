import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(  private ts: TeacherService ) { }

  rmn:any;
  UserTypeCode:any;
  name:any;
  MobileNo:any;
  UdiseCode:any;
  JoiningData:any;
  Designation:any;
  presentWorkingDate:any;
  gender:any;
  SchoolName:any;
  DistName : any ;

  ngOnInit():void {
    this.rmn =  sessionStorage.getItem('MobileNo')
    this.UserTypeCode =  sessionStorage.getItem('UserTypeCode')
    this.getTeacherData();
}



  getTeacherData(){
    this.ts.getTHomeData('teacher/getTdata/',this.rmn ,'/'+this.UserTypeCode).subscribe((res:any)=>{
      //  console.log(res)

      this.name = res.data[0][0].name;
      this.MobileNo = res.data[0][0].rmn;
      this.UdiseCode = res.data[0][0].UdiseCode;
      this.JoiningData = res.data[0][0].Date_of_joining_in_service;
      this.Designation = res.data[0][0].UserTypeHin;
      this.presentWorkingDate = res.data[0][0].Date_of_appointment_in_present_Cadre
      this.gender = res.data[0][0].gender;
      this.SchoolName = res.data[0][0].SchoolName;
      this.DistName =  res.data[0][0].DistName;

    })
  }

}
