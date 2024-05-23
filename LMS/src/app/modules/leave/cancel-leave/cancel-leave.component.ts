import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { CancelLeave } from 'src/app/models/models/applyleave.model';
import { LeaveService } from 'src/app/services/leave.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-cancel-leave',
  templateUrl: './cancel-leave.component.html',
  styleUrls: ['./cancel-leave.component.css']
})
export class CancelLeaveComponent {

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private toastrService: ToastrService,
    private _applservice: LeaveService
  ) { }

  cancelleaveform: FormGroup = this._fb.group({
    cancell: this._fb.array([
      //this.addrolesfb()
    ])
  });

  cancelleave: CancelLeave = {
    EmployeeId: null,
    LId: null,
    Reason: null,
    CancelType: null
  }


  showvali: boolean = false;
  msgCls = "alert bg-light-danger alert-dismissible mb-2";
  msg: string = "";
  leaves: any = [];

  faleaves: FormArray = (<FormArray>this.cancelleaveform.get('cancell'));
  groupcount: number = 0;

  addleave(): FormGroup {
    return this._fb.group({
      txtLId: [],
      txtALId: [],
      rbcomplete: [],
      rbextended: [],
      txtreason: ["", [Validators.maxLength(500)]]
    })
  }

  addbtn() {
    (<FormArray>this.cancelleaveform.get('cancell')).push(this.addleave());
  }

  ngOnInit(): void {
    this.fillData();
  }


  private fillData() {
    this._applservice.getleavescancel('leaveService/getleavescancel/', <string>sessionStorage.getItem("UserID")).subscribe((res: any) => {

      // console.log(res);
      if (res.status == 200) {
        this.leaves = res.data[0];
        this.groupcount = res.data[0].length;
        for (let i = 0; i < res.data[0].length; i++) {
          this.addbtn();
        }
      }

    })
  }

  // Takeaction for cancel
  takeaction(ApplId: number, LId: number, position: number) {

    this.showvali = false;
    let action1: string, action2: string, reason: string, canceltype: number, succmsg;
    action1 = this.faleaves.at(position).get('rbcomplete')?.value;
    action2 = this.faleaves.at(position).get('rbextended')?.value;
    reason = <string>this.faleaves.at(position).get('txtreason')?.value.trim();

    if (!action1 && !action2) {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " के लिए निरस्त करने का प्रकार चयन करें .";
      return;
    }
    if (action1 && action2) {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " के लिए निरस्त करने का केवल एक प्रकार चयन करें .";
      return;
    }
    else if (reason == "") {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " के लिए निरस्त करने का कारण प्रविष्ट करें .";
      return;
    }

    if (action1 == "T")
      canceltype = 1;
    else
      canceltype = 2;

    this.cancelleave = {
      EmployeeId: <string>sessionStorage.getItem("UserCode"),
      LId: LId,
      Reason: reason,
      CancelType: canceltype
    }

    this._applservice.cancelleave('leaveService/cancelleave', this.cancelleave).subscribe((res: any) => {

      //let res = result[0][0];
      console.log(res);
      if (<number>res.data[0][0].StatusNo == 1) {
        // console.log(<number>res.data[0][0].StatusNo);
        if (canceltype == 1)  {
          // console.log(canceltype);
          // console.log(ApplId + res[0][0].Msg);
        
          succmsg = ApplId + res[0][0].Msg;
          console.log(res[0][0].Msg);
          // console.log(succmsg);
        }
        else{
          console.log( res.data[0][0].Msg.substr(1));
          succmsg = res.data[0][0].Msg.substr(1);
        //this.showvali = true;
        this.msgCls = "alert bg-light-success alert-dismissible mb-2";
        this.msg = "अवकाश का आवेदन  - " + succmsg + " निरस्त कर दिया गया है.";
        this.toastrService.success(this.msg);
        this.fillData();
        }
      }
      else if (<number>res.data[0][0].StatusNo == 2) {
        //this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        this.msg = "अवकाश के लिए यह आवेदन आपके द्वारा पहले ही निरस्त किया जा चुका है.";
        //this.msg = result[0][0].Msg;
        this.toastrService.error(this.msg);
      }
    })
    // window.location.reload();
  }
}


