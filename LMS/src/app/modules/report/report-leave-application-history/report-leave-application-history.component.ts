import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-report-leave-application-history',
  templateUrl: './report-leave-application-history.component.html',
  styleUrls: ['./report-leave-application-history.component.css']
})
export class ReportLeaveApplicationHistoryComponent {

  constructor(private fb: FormBuilder, private _ARoute: ActivatedRoute, private _router: Router, public S: LeaveService) { }

  loading: boolean = false;
  content: boolean = false;

  MsgShow = false;

  LeaveApplication = [{ ApplicationId: "", LeaveFrom: "", LeaveTo: "", LeaveName: "", LeaveDays: "", Prefix: "", Suffix: "" }]

  ngOnInit(): void {

    this.MsgShow = false;

    this.content = sessionStorage.getItem("UserCode") != null ? true : false;


    this.S.getLeaveApplicationHistory('leaveService/getLeaveApplicationHistory/', <string>sessionStorage.getItem("UserID")).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.status == 200) {

          this.LeaveApplication = res.data[0];

          if (this.LeaveApplication.length > 0) {
            this.MsgShow = false;
          }
          else {
            this.MsgShow = true;
          }

          this.loading = false;

        }
        
      }

    )

  }
}
