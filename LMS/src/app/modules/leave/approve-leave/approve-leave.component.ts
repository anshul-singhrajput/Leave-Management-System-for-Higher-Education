import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateStatus, UpdateStatusBulk } from 'src/app/models/models/applyleave.model';
import { LeaveService } from 'src/app/services/leave.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent {

  constructor(private _fb: FormBuilder,
    public datepipe: DatePipe,
    private _router: Router,
    private _applservice: LeaveService,
  ) { }


  
  addbtnfb(): FormGroup {
    return this._fb.group({
      btnname: [''],
      txtLId: [],
      txtALId: [],
      chkselect: [""],
      ddlaction: [""],
      txtremarks: ["", [Validators.maxLength(500)]]
    })
  }

  addbtn() {
    (<FormArray>this.approveleaveform.get('extendl')).push(this.addbtnfb());
  }

  ngOnInit(): void {
    this.fillData();
  }

  approveleaveform: FormGroup = this._fb.group({
    chkselectall: [""],
    extendl: this._fb.array([
      //this.addrolesfb()
    ])
  });

  showvali: boolean = false;
  msgCls = "alert bg-light-danger alert-dismissible mb-2";
  msg: string = "";
  leaves: any = [];
  sancaction: any = [];
  fwdaction: any = [];
  fabtns: FormArray = (<FormArray>this.approveleaveform.get('extendl'));

  updatestatus: UpdateStatus = {
    StatusId: null,
    EmployeeId: null,
    LId: null,
    remarks: null,
    bulkstatus: null,
    LeaveCount: null
  }

  updatebulk: UpdateStatusBulk[] = [];

  isChecked: boolean = false;
  groupcount: number = 0;
  
  chkallChange(e: any){
    let id = e.target.value;
    // alert(id);

    for (let i = 0; i < this.groupcount; i++) {
      this.fabtns.at(i).get('chkselect')?.patchValue(this.isChecked);
    }
  }

  
  private fillData() {
    this._applservice.getleavesapprove('leaveService/getLeavesApprove/', <string>sessionStorage.getItem("UserID")).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res)
        this.leaves = res.data[0];
        this.fwdaction = res.data[1];
        this.sancaction = res.data[2];
        this.groupcount = res.data[0].length;
        for (let i = 0; i < res.data[0].length; i++) {
          this.addbtn();
        }
      }
      // console.log(res);
    });
  }

  takeaction(ApplId: number, LId: number, position: number) {
    //  alert(ApplId);
    // alert(position);
    this.showvali = false;
    let action: string, remark: string;
    action = this.fabtns.at(position).get('ddlaction')?.value;
    remark = <string>this.fabtns.at(position).get('txtremarks')?.value;

    if (this.fabtns.at(position).get('chkselect')?.value == "") {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " में कार्यवाही करने के लिए उसका चयन करें .";
      return;
    }

    if (action == "") {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " में कार्यवाही करने के लिए कार्यवाही का प्रकार चयन करें .";
      return;
    }

    if (action == "5" && remark == "") {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " में कार्यवाही करने के लिए रिमार्क प्रविष्ट करें .";
      return;
    }

    this.updatestatus = {
      StatusId: <number><unknown>action,
      EmployeeId: <string>sessionStorage.getItem("UserID"),
      LId: LId,
      remarks: remark,
      bulkstatus: null,
      LeaveCount: null
    }

       // console.log(this.updatestatus);
       let status = "";
       if (this.updatestatus.StatusId == 3)
         status = " कार्यवाही के लिए आगे भेजा गया है .";
       else if (this.updatestatus.StatusId == 4)
         status = " स्वीकृत हो गया है .";
       else if (this.updatestatus.StatusId == 5)
         status = " अस्वीकृत कर दिया गया है .";

         this._applservice.updatestatus('leaveService/updateleavestatus', this.updatestatus).subscribe((res: any) => {
          console.log(res);
          if (res.status == 200) {
            //let res = result[0][0];
            // console.log(result);
            this.showvali = true;
            this.msgCls = "alert bg-light-success alert-dismissible mb-2";
            this.msg = "अवकाश का आवेदन  - " + ApplId + status;
            this.fillData();
          }
        })
  }

  
  updateleavestatus() {
    this.showvali = false;
    this.updatestatus.bulkstatus = [];
    let checkedcount: number = 0;
    let action: string, remark: string, ApplId: string;
      //console.log(<string>sessionStorage.getItem("UserCode"),
    // this.fabtns.at(position).get('ddlaction')?.value, <string><unknown>LId);
  }

}
