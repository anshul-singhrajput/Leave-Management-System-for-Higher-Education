import { Component } from '@angular/core';
import { ChartType } from 'chart.js'
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-dashboard',
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.css']
})
export class LeaveDashboardComponent {

  constructor(private fb: FormBuilder, private _ARoute: ActivatedRoute, private _router: Router, public S: LeaveService) { }

  CL: number = 0;
  EL: number = 0;
  HPL: number = 0;
  RL: number = 0;

   // ADD CHART OPTIONS.
   pieChartOptions = {
    responsive: true
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };

  pieChartLabels = ['RL', 'CL','EL','HPL'];

  public pieChartType: ChartType = 'pie';

  pieChartData: any = [
    {
      data: [this.RL, this.CL, this.EL, this.HPL]
    }
  ];

  CurrYear: number = (new Date()).getFullYear();


  AvailableLeave = [{
    EmployeeId: "", TeacherName: "", DistName: "", CL: 0, EL: 0,
    HPL: 0, RL: 0
  }]

  PendingApp = [{ EmployeeId: "", TeacherName: "", CL: 0, EL: 0, HPL: 0, RL: 0 }]
  LeaveJoining = [{ CL: 0, EL: 0, HPL: 0, RL: 0 }]
  LeaveHistory = [{ LeaveFrom: "", LeaveTo: "", LeaveName: "" }]
  LeaveSanctioned = [{ CL: 0, EL: 0, HPL: 0, RL: 0 }]


  ngOnInit(): void {
    this.S.getLeaveDashboard('leaveService/getLeaveDashboard/', <string>sessionStorage.getItem("UserID")).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 200) {
          // console.log(res.data[0])
          // console.log( this.AvailableLeave)
          // console.log( res.data[0].length)
          console.log( res.data[0].length ? res.data[0] : this.AvailableLeave);
          this.AvailableLeave = res.data[0].length ? res.data[0] : this.AvailableLeave;

          this.PendingApp = res.data[1].length ? res.data[1] : this.PendingApp;

          this.LeaveJoining = res.data[2].length ? res.data[2] : this.LeaveJoining;

          this.LeaveSanctioned = res.data[3].length ? res.data[3] : this.LeaveSanctioned;

          this.LeaveHistory = res.data[4];

          // this.CL = this.AvailableLeave[0].CL;
          // this.EL = this.AvailableLeave[0].EL;
          // this.HPL = this.AvailableLeave[0].HPL;
          // this.RL = this.AvailableLeave[0].RL;

          this.CL = this.LeaveSanctioned[0].CL;
          this.EL = this.LeaveSanctioned[0].EL;
          this.HPL = this.LeaveSanctioned[0].HPL;
          this.RL = this.LeaveSanctioned[0].RL;

          this.pieChartData = [
            {
              data: [this.RL, this.CL, this.EL, this.HPL]
            }
          ];

          
        
        }
      })
  }




  LeaveHistoryPage() {
    this._router.navigateByUrl('report/ReportLeaveApplicationHistory');
  }

}
