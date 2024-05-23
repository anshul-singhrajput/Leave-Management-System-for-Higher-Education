import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/services/leave.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { JoinLeave } from 'src/app/models/models/applyleave.model';


@Component({
  selector: 'app-join-leave',
  templateUrl: './join-leave.component.html',
  styleUrls: ['./join-leave.component.css']
})
export class JoinLeaveComponent {

  constructor(private _fb: FormBuilder,
    public datepipe: DatePipe,
    private _router: Router,
    private toastrService: ToastrService,
    private _applservice: LeaveService
  ) {
    this.bsdate = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      minDate: new Date(),
      maxDate: this.addDays(new Date(), 900),
      dateInputFormat: 'DD/MM/YYYY'
    });
  }

  joinleaveform: FormGroup = this._fb.group({
    joinl: this._fb.array([
      //this.addrolesfb()
    ])
  });

  joinleave: JoinLeave = {
    EmployeeId: null,
    LId: null,
    JoiningDate: null
  }

  showvali: boolean = false;
  msgCls = "alert bg-light-danger alert-dismissible mb-2";
  msg: string = "";
  leaves: any = [];

  faleaves: FormArray = (<FormArray>this.joinleaveform.get('joinl'));
  groupcount: number = 0;
  bsdate: Partial<BsDatepickerConfig>;


  addDays(date: Date, days: number) {
    const find = new Date(Number(date))
    find.setDate(date.getDate() + days)
    return find
  }

  addleave(): FormGroup {
    return this._fb.group({
      txtToDate: [],
      txtjoiningdate: ["", Validators.required]
    })
  }

  addbtn() {
    (<FormArray>this.joinleaveform.get('joinl')).push(this.addleave());
  }

  ngOnInit(): void {
    this.fillData();
  }

  private fillData() {

    this._applservice.getleavesjoining('leaveService/getleavesjoining/', <string>sessionStorage.getItem("UserID")).subscribe((res: any) => {

      console.log(res);
      if (res.status == 200) {
        this.leaves = res.data[0];
        this.groupcount = res.data[0].length;
        for (let i = 0; i < res.data[0].length; i++) {
          this.addbtn();
        }
      }

    })
  }

  // Take Action for join Leave
  takeaction(ApplId: number, LId: number, position: number) {
    alert(ApplId);
    alert(position);
    this.showvali = false;
    let jdate: string, todate: string;
    // console.log(action);
    // console.log(this.faleaves.at(position-1).get('rbcomplete')?.value);

    jdate = <string>this.faleaves.at(position).get('txtjoiningdate')?.value;

    if (jdate == "") {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " के लिए ज्वाइन करने का दिनांक प्रविष्ट करें .";
      return;
    }

    todate = <string>this.faleaves.at(position).get('txtToDate')?.value;
    jdate = <string>this.datepipe.transform(jdate, 'yyyy-MM-dd');

    if (jdate <= todate) {
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "आवेदन  - " + ApplId + " के लिए ज्वाइन करने का दिनांक, दिनांक तक से बड़ा होना चाहिए .";
      return;
    }

    this.joinleave = {
      EmployeeId: <string>sessionStorage.getItem("UserCode"),
      LId: LId,
      JoiningDate: jdate
    }

    console.log(this.joinleave);

    this._applservice.joinleave('leaveService/joinleave', this.joinleave).subscribe((res: any) => {
      //let res = result[0][0];
      // console.log(result);

      if (<number>res.data[0][0].StatusNo == 1) {

        this.showvali = true;
        this.msgCls = "alert bg-light-success alert-dismissible mb-2";
        this.msg = "अवकाश का आवेदन  - " + ApplId + " के लिए ज्वाइनिंग कर लिया गया है.";
        this.fillData();
      }
      else if (<number>res.data[0][0].StatusNo == 2) {
        this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        //this.msg = "अवकाश के लिए यह आवेदन आपके द्वारा पहले ही किया जा चुका है.";
        this.msg = res.data[0][0].Msg;
      }
    })
  }



}



