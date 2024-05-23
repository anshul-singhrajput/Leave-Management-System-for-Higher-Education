import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { LeaveService } from 'src/app/services/leave.service';
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-printlvapplication',
  templateUrl: './printlvapplication.component.html',
  styleUrls: ['./printlvapplication.component.css']
})
export class PrintlvapplicationComponent {

  constructor(private location: Location ,private fb: FormBuilder,
    public S: LeaveService ,  private route: ActivatedRoute, private _router: Router, )  {}

  leaves: any = [];

  LId: string = ""; CL: string = ""; EL: string = ""; HPL: string = ""; RH: string = "";PDFTo: string = "";

  EmpData =
    {
      EmpName: "", EmployeeId: "", ApplicationId: "", Reason: "", Prefix: "", Suffix: "", AddressDuringLeave: "", Remarks: "",
      IsOutOfStation: "", AppliedDate: ""
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
         params.get('ApplicationId') ;
        this.LId = <string>params.get('LId');
        this.GetData(this.LId);
        // console.log(this.applicationid);
      });

      if (<string>sessionStorage.getItem("UserTypeCode") != "2"
      && <string>sessionStorage.getItem("UserTypeCode") != "4" && <string>sessionStorage.getItem("UserTypeCode") != "20001") {
      this._router.navigateByUrl('/login');
    }
    }

    private GetData(LId: string) {
      console.log(LId);
      this.S.getprintdata('leave/getPdf', LId).subscribe((result : any) => {
          console.log(result);
          if (result.status == 200) {
            console.log(result);
            // console.log(result[0][5]);
            this.leaves = result.data[0];
            this.EmpData = result.data[0][0];
            this.CL = result.data[1][0].LeaveBalance;
            this.EL = result.data[1][1].LeaveBalance;
            this.HPL = result.data[1][2].LeaveBalance;
            this.RH = result.data[1][3].LeaveBalance;
            this.PDFTo = result.data[0][0].ReportingoffcEmployeeDesignation;
          }
          // console.log(this.PDFTo);
          //this.extendleaveidform.get('ddlleavetype')?.disable();
        })
    }

  print(cmpName : any) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  back(): void {
    this.location.back();
  }
}
