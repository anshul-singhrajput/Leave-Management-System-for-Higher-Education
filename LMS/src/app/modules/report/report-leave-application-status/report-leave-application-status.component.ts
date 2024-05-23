import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-report-leave-application-status',
  templateUrl: './report-leave-application-status.component.html',
  styleUrls: ['./report-leave-application-status.component.css']
})
export class ReportLeaveApplicationStatusComponent {

  constructor(private fb: FormBuilder, private _ARoute: ActivatedRoute, private _router: Router, public S: LeaveService) { }

  loading: boolean = false;
  content: boolean = false;
  MsgShow = false;

  
    // Header Label
    HeaderLabel = [{
      EmployeeId: "", TeacherName: "", DistName: "", CL: 0, EL: 0,
      HPL: 0, RL: 0
    }]

      // Tab Count Variables
  AllApplicationCount: number = 0;
  LeaveAppliedCount: number = 0;
  joiningCount: number = 0;
  LeaveExtensionCount: number = 0;
  StationLeaveCount: number = 0;
  cancellationCount: number = 0;

   // Tab Content Tables
   AllApplication = [{ ApplicationId: "", LeaveName: "", ApplicationPeriod: "", AppliedDate: "", StatusName: "" }]
   LeaveApplied = [{ ApplicationId: "", LeaveName: "", ApplicationPeriod: "", AppliedDate: "", StatusName: "" }]
   joining = [{ ApplicationId: "", LeaveName: "", ApplicationPeriod: "", AppliedDate: "", StatusName: "" }]
   LeaveExtension = [{ ApplicationId: "", LeaveName: "", ApplicationPeriod: "", AppliedDate: "", StatusName: "" }]
   StationLeave = [{ ApplicationId: "", LeaveName: "", ApplicationPeriod: "", AppliedDate: "", StatusName: "" }]
   cancellation = [{ ApplicationId: "", LeaveName: "", ApplicationPeriod: "", AppliedDate: "", StatusName: "" }]

   ngOnInit(): void {
    this.MsgShow = false;
    this.content = sessionStorage.getItem("UserID") != null ? true : false;
    this.S.getLeaveApplicationStatus('leaveService/getLeaveApplicationStatus/', <string>sessionStorage.getItem("UserID")).subscribe(
      (res: any) => {

        // console.log(res);
        if (res.status == 200) {
          // console.log( this.HeaderLabel = res.data[0]);
          this.HeaderLabel = res.data[0];

          this.AllApplication = res.data[1];

          this.LeaveApplied = res.data[2];

          this.joining = res.data[3];

          this.LeaveExtension = res.data[4];

          // this.StationLeave = res.data[5];

          this.cancellation = res.data[5];


          this.LengthCount();


          if (this.AllApplication.length > 0) {
            this.MsgShow = false;
          }
          else {
            this.MsgShow = true;
          }

          this.loading = false;
        }
      })
   }

   LengthCount() {
    this.AllApplicationCount = this.AllApplication.length;
    this.LeaveAppliedCount = this.LeaveApplied.length;
    this.joiningCount = this.joining.length;
    this.LeaveExtensionCount = this.LeaveExtension.length;
    // this.StationLeaveCount = this.StationLeave.length;
    this.cancellationCount = this.cancellation.length;
  }
  
}
