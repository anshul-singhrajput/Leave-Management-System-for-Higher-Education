import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-p-home',
  templateUrl: './p-home.component.html',
  styleUrls: ['./p-home.component.css']
})
export class PHomeComponent {
  constructor(private ts: TeacherService) { }

  rmn: any;
  UserTypeCode: any;

  ngOnInit(): void {
    this.rmn = sessionStorage.getItem('MobileNo')
    this.UserTypeCode = sessionStorage.getItem('UserTypeCode')

    this.getTeacherData();
  }

  name: any;
  MobileNo: any;
  UdiseCode: any;
  JoiningData: any;
  Designation: any;
  presentWorkingDate: any;
  SchoolName: any;
  gender: any;
  DistName : any ;

  getTeacherData() {
    this.ts.getTHomeData('teacher/getPdata/', this.rmn, '/' + this.UserTypeCode).subscribe((res: any) => {
      // console.log(res)

      this.name = res.data[0][0].name;
      this.MobileNo = res.data[0][0].rmn;
      this.UdiseCode = res.data[0][0].UdiseCode;
      this.JoiningData = res.data[0][0].Date_of_joining_in_service;
      this.Designation = res.data[0][0].UserTypeHin;
      this.presentWorkingDate = res.data[0][0].Date_of_appointment_in_present_Cadre
      this.SchoolName = res.data[0][0].SchoolName;
      this.gender = res.data[0][0].gender;
      this.DistName = res.data[0][0].DistName;
    })

  }
}
