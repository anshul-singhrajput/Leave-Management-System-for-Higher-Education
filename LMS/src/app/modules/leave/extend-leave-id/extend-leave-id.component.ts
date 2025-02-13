import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/leave.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { throwError } from 'rxjs';
import { ToastrService } from 'src/app/services/toastr.service';
import { ApplyLeave, FromToLeave} from 'src/app/models/models/applyleave.model'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-extend-leave-id',
  templateUrl: './extend-leave-id.component.html',
  styleUrls: ['./extend-leave-id.component.css']
})
export class ExtendLeaveIdComponent {
  minDate: Date;
  pastLeaves: any = [];
  LastDate: Date;
  applicationid: string;
  submitted: boolean = false;
  showvali: boolean = false;
  bsdatefrom: Partial<BsDatepickerConfig>;
  bsdateto: Partial<BsDatepickerConfig>;
  selectedFile: any;
  msgCls = "alert alert-warning alert-dismissible fade show";
  msg: string = "";
  leavetype: any = [];
  leavetypemulti: any = [];
  lessleavedays: any = [];
  groupcount: number = 0;

  added: boolean = false;
  GenderId: string = "";

  appleave: ApplyLeave = {
    TeacherCode: null,
    ApplicationId: null,
    LeaveType: null,
    Reason: null,
    ExtendedAgainstApplicationId: null,
    IsOutOfStation: null,
    AddressDuringLeave: null,
    Remarks: null,
    UploadAppPath: null,
    Leaves: null
  }

  frmtoleave: FromToLeave[] = [];

  extendleaveidform: FormGroup = this._fb.group({
    ddlleaveappltype: ["", Validators.required],
    txtreason: ["", [Validators.required, Validators.maxLength(100)]],
    leaves: this._fb.array([this.addfromto()]),
    ddlstationleave: ["", Validators.required],
    txtaddressduringleave: ["", [Validators.required, Validators.maxLength(100)]],
    txtremarks: ["", [Validators.maxLength(500)]],
    fuuploadpath: ["", [Validators.maxLength(100)]],
    hdnLid: ["", Validators.required],
    hdnApplicationId: ["", Validators.required],
    hdnLastDate: [""]
  });

  addfromto(): FormGroup {
    return this._fb.group({
      ddlleavetype: ["", Validators.required],
      txtmaxlimit: [""],
      txtfromdate: ["", Validators.required],
      txttodate: ["", Validators.required],
      ddlfromday: ["", Validators.required],
      ddltoday: ["", Validators.required],
      ddlfromnoon: [""],
      ddltonoon: [""],
      txtleavedays: [""]
    });
  }

  faleave: FormArray = (<FormArray>this.extendleaveidform.get('leaves'));

  constructor(
    private toastrService: ToastrService,
    private leave: LeaveService,
    private route: ActivatedRoute, private _fb: FormBuilder,
    public datepipe: DatePipe,
    private _msservice: LeaveService,
    private _router: Router,
    private _applservice: LeaveService
  ) {
    this.minDate = new Date();
    this.LastDate = new Date();
    this.applicationid = "";

    //#region date setting
    this.bsdatefrom = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      minDate: new Date(),
      maxDate: this.addDays(new Date(), 900),
      dateInputFormat: 'DD/MM/YYYY'
    });

    this.bsdateto = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      minDate: new Date(),
      maxDate: this.addDays(new Date(), 900),
      dateInputFormat: 'DD/MM/YYYY'
    });
    //#endregion
  }

  addleave() {
    this.added = true;

    // stop here if form is invalid
    if (this.faleave.invalid) {
      return;
    }

    (<FormArray>this.extendleaveidform.get('leaves')).push(this.addfromto());
    this.groupcount = this.groupcount + 1;
    //alert(this.groupcount); 
    if (this.groupcount > 0) {
      this.faleave.at(this.groupcount).get('txtfromdate')?.patchValue(this.addDays(new Date(this.faleave.at(this.groupcount - 1).get('txttodate')?.value), 1));
      this.faleave.at(this.groupcount).get('txtfromdate')?.disable();
      this.minDate = this.addDays(new Date(this.faleave.at(this.groupcount - 1).get('txttodate')?.value), 1);
    }

    if (this.groupcount == 1) {
      this.bindLeaveMapping();
    }
  }

  private bindLeaveMapping() {
    this.leave.getleavemapping('leaveService/getleavemapping/', 1, '/' + this.GenderId)
      .subscribe((res: any) => {
        // console.log(res.data[0]);
        this.leavetypemulti = res.data[0];
      });
  }

  removeleave() {
    (<FormArray>this.extendleaveidform.get('leaves')).removeAt(this.groupcount);
    this.groupcount = this.groupcount - 1;
    //alert(this.groupcount);
  }

  addDays(date: Date, days: number) {
    const find = new Date(Number(date))
    find.setDate(date.getDate() + days)
    return find
  }

  addDaysToFrom(days: number) {
    var dateString = this.addDays(new Date(this.extendleaveidform.controls['hdnLastDate'].value), days); //date string in dd-mm-yyyy format
    let dateObj;
    if (dateString.toString().includes("/")) {
      let dateArray = dateString.toString().split("/");
      dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
     
    }
    else
      dateObj = new Date(dateString);

    this.minDate = dateObj;
    // console.log("dateObj -" + dateObj);
    this.faleave.at(0).get('txtfromdate')?.patchValue(dateObj);
    this.faleave.at(0).get('txtfromdate')?.disable();

  }

  // Get Data from selected Leave ID
  GetData(applicationid: string) {
    this.leave.filldataForExtend('leaveService/GetLeaveForExtend/',applicationid).subscribe((res:any) => {

        if (res.status == 200) {
         console.log(res)
          this.pastLeaves = res.data[1];
          this.extendleaveidform.controls['hdnLid'].setValue(res.data[0][res.data[0].length - 1]["Lid"]);          
          this.extendleaveidform.controls['hdnApplicationId'].setValue(res.data[0][res.data[0].length - 1]["ApplicationId"]);
          this.extendleaveidform.controls['txtreason'].setValue(res.data[0][res.data[0].length - 1]["Reason"]);
          this.extendleaveidform.controls['txtremarks'].setValue(res.data[0][res.data[0].length - 1]["Remarks"]);
          this.extendleaveidform.controls['hdnLastDate'].setValue(<any>res.data[0][res.data[0].length - 1]["ToDate"])
          this.addDaysToFrom(1);
          this.faleave.at(0).get('ddlfromday')?.setValue("1");
          this.faleave.at(0).get('ddltoday')?.setValue("1");
        }
      }
    )
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      //  params.get('ApplicationId') ;
      this.applicationid = <string>params.get('ApplicationId');
      this.GetData(this.applicationid);
      // console.log(this.applicationid);
    });
    //console.log(this.addDays(new Date(),900)
    if (<string>sessionStorage.getItem("UserTypeCode") != "2"
      && <string>sessionStorage.getItem("UserTypeCode") != "911" && <string>sessionStorage.getItem("UserTypeCode") != "910") {
      this._router.navigateByUrl('/login');
    }

    this.filldata("I");
  }

  private filldata(val: string) {
    this.extendleaveidform.controls['ddlleaveappltype'].patchValue("1");
    //this.extendleaveidform.get('ddlleavetype')?.enable();

    this.leave.filldata('leaveService/filldataal/', "1", '/' +
      <string>sessionStorage.getItem("UserID")).subscribe((res: any) => {

        // console.log(res);
        if (res.status == 200) {
          if (val == "I") {

            // if (result[1].length <= 0) {
            //   this.toastrService.error("आप अवकाश का आवेदन नहीं कर सकते हैं, अभी व्याख्याता एवं प्राचार्य, अवकाश का आवेदन कर सकते हैं |");
            //   this.location.back();
            // }

            this.leavetype = res.data[0];
          }
          //console.log(this.leavetype)
          //console.log(this.leavetype)
          this.extendleaveidform.controls['txtaddressduringleave'].patchValue(res.data[1][0].address);
          this.GenderId = res.data[1][0].GenderId;
          //this.applyleaveform.controls.ddlleavetype.patchValue(1);
        }
        // this.extendleaveidform.get('ddlleavetype')?.disable();
      });



  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]
    }
    else
      this.selectedFile = null;
  }

  onfromdayChange(e: any, position: number) {
    let id = e.target.value;
    //alert(position);
    this.faleave.at(position).get('ddlfromnoon')?.patchValue("");
    if (id == 1) {
      this.faleave.at(position).get('ddlfromnoon')?.clearValidators();
      //this.extendleaveidform.get('ddlfromnoon')?.clearValidators();
      this.faleave.at(position).get('ddlfromnoon')?.updateValueAndValidity();
    }
    else {
      this.faleave.at(position).get('ddlfromnoon')?.setValidators([Validators.required]);
      this.faleave.at(position).get('ddlfromnoon')?.updateValueAndValidity();
    }
    this.calDays(position);
  }

  ontodayChange(e: any, position: number) {
    let id = e.target.value;
    this.faleave.at(position).get('ddltonoon')?.patchValue("");
    if (id == 1) {
      this.faleave.at(position).get('ddltonoon')?.clearValidators();
      this.faleave.at(position).get('ddltonoon')?.updateValueAndValidity();
    }
    else {
      this.faleave.at(position).get('ddltonoon')?.setValidators([Validators.required]);
      this.faleave.at(position).get('ddltonoon')?.updateValueAndValidity();
    }
    this.calDays(position);
  }

  onstationleave(e: any) {
    let id = e.target.value;
    if (id == 1) {
      this.extendleaveidform.controls['txtaddressduringleave'].patchValue("");
    }
  }

  onfromnoonChange(e: any, position: number) {
    let id = e.target.value;
    //alert(position);
    this.calDays(position);
  }
  ontonoonChange(e: any, position: number) {
    let id = e.target.value;
    this.calDays(position);
  }

  onFromDateChange(position: number) {
    // alert(position);
    if (position != 0)
      this.validatedate(position);
    // this.calDays(position);
  }

  onToDateChange(position: number) {
    // var fromdate =
    //   <string>this.extendleaveidform.controls.txtfromdate?.value != "" ? this.datepipe.transform(this.extendleaveidform.controls.txtfromdate.value, 'yyyy-MM-dd') : null;
    // var todate =
    //   <string>this.extendleaveidform.controls.txttodate.value != "" ? this.datepipe.transform(this.extendleaveidform.controls.txttodate.value, 'yyyy-MM-dd') : null;
    // var fromday = this.extendleaveidform.controls.ddlfromday?.value;

    // if (fromdate === todate) {
    //   if (fromday) {
    //     var fromnoon = this.extendleaveidform.controls.ddlfromnoon?.value;
    //     this.extendleaveidform.controls.ddltoday.patchValue(fromday);

    //     if (fromnoon)
    //     this.extendleaveidform.controls.ddltonoon.patchValue(fromnoon);
    //   }
    // }
    if (this.groupcount >= position + 1) {
      if (this.faleave.at(position).get('txttodate')?.value != "") {
        this.faleave.at(position + 1).get('txtfromdate')?.patchValue(this.addDays(new Date(this.faleave.at(position).get('txttodate')?.value), 1));
      }
      else
        this.faleave.at(position + 1).get('txtfromdate')?.patchValue(null);
    }

    this.validatedate(position);
    // this.calDays(position);
  }

  onleaveappltypeChange(e: any) {
    this.removeLeaveTypes();
  }

  UserID: any;
  private removeLeaveTypes() {
    if (this.groupcount > 0) {
      for (var i = this.groupcount; i > 0; i--) {
        (<FormArray>this.extendleaveidform.get('leaves')).removeAt(i);
        this.groupcount--;
      }
    }
  }

  onleavetypeChange(e: any, position: number) {
    let id = e.target.value;
    // alert(id);
    this.faleave.at(position).get('txtmaxlimit')?.patchValue(null);
    if (this.faleave.at(position).get('txtfromdate')?.disabled == false)
      // this.faleave.at(position).get('txtfromdate')?.patchValue(null);
      this.faleave.at(position).get('txttodate')?.patchValue(null);
    this.faleave.at(position).get('txtleavedays')?.patchValue(null);

    this.faleave.at(position).get('ddlfromday')?.setValue("1");
    this.faleave.at(position).get('ddltoday')?.setValue("1");
    this.faleave.at(position).get('ddlfromnoon')?.patchValue("");
    this.faleave.at(position).get('ddltonoon')?.patchValue("");

    if (position == 0)
      this.bindLeaveMapping();

    if (id == 1) {
      this.faleave.at(position).get('ddlfromday')?.setValidators([Validators.required]);
      this.faleave.at(position).get('ddlfromday')?.updateValueAndValidity();
      this.faleave.at(position).get('ddltoday')?.setValidators([Validators.required]);
      this.faleave.at(position).get('ddltoday')?.updateValueAndValidity();
    }
    else {
      this.faleave.at(position).get('ddlfromday')?.clearValidators();
      this.faleave.at(position).get('ddlfromday')?.updateValueAndValidity();
      this.faleave.at(position).get('ddltoday')?.clearValidators();
      this.faleave.at(position).get('ddltoday')?.updateValueAndValidity();
    }

    if (id != "") {
      this.leave.getmaxleave('leaveService/getmaxleaveal/', id, '/' +  <string>sessionStorage.getItem("UserID")).subscribe((res: any) => {
        //<number>result[0].MaxLeave       
        this.faleave.at(position).get('txtmaxlimit')?.patchValue(res.data[0][0].MaxLeave);

      })
    }
  }

  validatedate(position: number) {
    this.showvali = false;
    var fromdate = this.faleave.at(position).get('txtfromdate')?.value;
    var isfromdisable = this.faleave.at(position).get('txtfromdate')?.disabled;
    //alert(fromdate);

    var todate = this.faleave.at(position).get('txttodate')?.value;

    fromdate = this.datepipe.transform(fromdate, 'yyyy-MM-dd');
    todate = this.datepipe.transform(todate, 'yyyy-MM-dd');
    var ltype = this.faleave.at(position).get('ddlleavetype')?.value;

    if (fromdate != null || todate != null) {
      this.leave.validateholiday('leaveService/validateholidayal/', ltype ? ltype : "0", fromdate ? fromdate : "0", todate ? todate : "0", isfromdisable == true ? "1" : "0").subscribe((res: any) => {
        // console.log(res.data[0][0]);
        //let res = result[0][0];
        if (<number>res.data[0][0].StatusNo == 2) {
          this.faleave.at(position).get('txtfromdate')?.patchValue(null);
          this.showvali = true;
          this.msgCls = "alert alert-warning alert-dismissible mb-2";
          this.msg = "Gazetted Holiday या Weekend में अवकाश नहीं लिया जा सकता है, सही दिनांक से चयन करें.";
        }
        else if (<number>res.data[0][0].StatusNo == 3) {
          this.faleave.at(position).get('txttodate')?.patchValue(null);
          this.showvali = true;
          this.msgCls = "alert alert-warning alert-dismissible mb-2";
          this.msg = "Gazetted Holiday या Weekend में अवकाश नहीं लिया जा सकता है, सही दिनांक तक चयन करें.";
        }
        else if (<number>res.data[0][0].StatusNo == 4) {
          this.faleave.at(position).get('txtfromdate')?.patchValue(null);
          this.showvali = true;
          this.msgCls = "alert alert-warning alert-dismissible mb-2";
          this.msg = "चुना गया दिनांक से Optional Holiday नही है, सही दिनांक से चयन करें.";
        }
        else if (ltype == 7 && <number>res.data[0][0].StatusNo == 5) {
          this.faleave.at(position).get('txttodate')?.patchValue(null);
          this.showvali = true;
          this.msgCls = "alert alert-warning alert-dismissible mb-2";
          this.msg = "चुना गया दिनांक तक Optional Holiday नही है, सही दिनांक तक चयन करें.";
        }
        else if (<number>res.data[0][0].StatusNo == 1) {
          this.lessleavedays[position] = <number>res.data[0][0].Msg;
          // console.log(this.lessleavedays);
          this.calDays(position);
        }

      })
    }
  }

  private calDays(position: number) {
    var days = 0;
    var fromdate = this.faleave.at(position).get('txtfromdate')?.value;
    var todate = this.faleave.at(position).get('txttodate')?.value;
    var fromday = this.faleave.at(position).get('ddlfromday')?.value;
    var today = this.faleave.at(position).get('ddltoday')?.value;
    var leavetype = this.faleave.at(position).get('ddlleavetype')?.value;
    //console.log(fromdate, todate, fromday, today);
    if (fromdate && todate) {

      days =
        Math.floor((Date.UTC(todate.getFullYear(), todate.getMonth(), todate.getDate()) -
          Date.UTC(fromdate.getFullYear(), fromdate.getMonth(), fromdate.getDate())) / (1000 * 60 * 60 * 24));

      // if (this.faleave.at(position).get('ddlleavetype')?.value == "1") {
      if (leavetype == "1") {
        if (fromday && today) {
          var fromnoon = this.faleave.at(position).get('ddlfromnoon')?.value;
          var tonoon = this.faleave.at(position).get('ddltonoon')?.value;

          // if (days > 1 && (fromnoon == 1 || tonoon == 2)) {
          //   days = (1 / fromday) + (1 / today);
          // }
          // else {
          if (fromday == today) {
            if (fromday == 1)
              days = days + 1;
            if (fromday == 2) {
              //alert(days);
              if (days == 0) {
                //alert(3);
                days = days + 0.5;
                if (fromnoon && tonoon && fromnoon != tonoon)
                  days = days + 0.5;
              }
            }
          }

          if (fromday != today)
            days = days + 0.5;
          //}
          //console.log(days, this.lessleavedays);
          if (days > 0) {
            days = days - this.lessleavedays[position];
          }
        }
      }
      else {
        days = days + 1;

        if ((leavetype == "7" || leavetype == "10") && days > 0) {
          days = days - this.lessleavedays[position];
        }
      }
      this.faleave.at(position).get('txtleavedays')?.patchValue(days);
    }
  }

  hasHindiCharacters(str: string): boolean {
    var isunicode: boolean = false;

    for (var i = 0, n = str.length; i < n; i++) {
      var charCode = str.charCodeAt(i);
      if (charCode >= 2309 && charCode <= 2361) { isunicode = true; }
      else { return false; }
    }

    return isunicode;
  }

  saveleave() {

    this.showvali = false;
    this.submitted = true;
    this.frmtoleave = [];
    // console.log(this.extendleaveidform.invalid);
    // console.log(this.faleave.invalid);
    // stop here if form is invalid

    //console.log(this.lessleavedays);
    if (this.extendleaveidform.invalid) {
      return;
    }
    

    let body = this.extendleaveidform.value;

    if (this.selectedFile && (this.selectedFile.type.toLowerCase() != "application/pdf" &&
      this.selectedFile.type.toLowerCase() != "image/png" &&
      this.selectedFile.type.toLowerCase() != "image/jpg" &&
      this.selectedFile.type.toLowerCase() != "image/jpeg")) {
      //alert('कृपया PDF फाइल का चयन करें')
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "PDF/Image फाइल अपलोड करें.";
      this.toastrService.error(this.msg);
      return;
    }
    else if (this.selectedFile && Math.ceil(this.selectedFile.size / 1024) > 25600) {
      //alert('कृपया PDF फाइल का चयन करें')
      this.showvali = true;
      this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
      this.msg = "PDF/Image फाइल 25 MB साइज़ तक अपलोड करें.";
      this.toastrService.error(this.msg);
      return;
    }

    var fromdate, todate, fafromdate, fatodate, totleaves = 0, leaveid = 0, maxleave = 0, fafromday, fatoday, lvdays,
      fafromnoon, fatonoon, extracount = 0;

    for (let i = 0; i <= this.groupcount; i++) {

      fafromdate = <string>this.datepipe.transform(this.faleave.at(i).get('txtfromdate')?.value, 'yyyy-MM-dd');
      fatodate = <string>this.datepipe.transform(this.faleave.at(i).get('txttodate')?.value, 'yyyy-MM-dd');
      lvdays = this.faleave.at(i).get('txtleavedays')?.value;
      fafromnoon = this.faleave.at(i).get('ddlfromnoon')?.value;
      fatonoon = this.faleave.at(i).get('ddltonoon')?.value;
      fafromday = this.faleave.at(i).get('ddlfromday')?.value;
      fatoday = this.faleave.at(i).get('ddltoday')?.value;

      if (fafromdate > fatodate) {
        this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        this.msg = "दिनांक से, दिनांक तक से अधिक नहीं हो सकता है. पंक्ति - " + (<string><unknown>i + 1);
        this.toastrService.error(this.msg);
        return;
      }
      if (this.faleave.at(i).get('ddlleavetype')?.value == "1" && fafromdate === fatodate &&
        this.faleave.at(i).get('ddlfromday')?.value != this.faleave.at(i).get('ddltoday')?.value) {
        this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        this.msg = "दिनांक से एवं दिनांक तक समान होने पर Fullday एवं Halfday एक साथ चयन नहीं किया जा सकता है. पंक्ति - " + (<string><unknown>i + 1);
        this.toastrService.error(this.msg);
        return;
      }
      else if (this.faleave.at(i).get('ddlleavetype')?.value == "1" && fafromdate === fatodate && fafromnoon == "2" && fatonoon == "1") {
        this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        this.msg = "दिनांक से एवं दिनांक तक समान होने पर Afternoon से Forenoon तक चयन नहीं किया जा सकता है. पंक्ति - " + (<string><unknown>i + 1);
        return;
      }
      else if (this.faleave.at(i).get('ddlleavetype')?.value != "10" && <number>this.faleave.at(i).get('txtleavedays')?.value >
        <number>this.faleave.at(i).get('txtmaxlimit')?.value) {
        this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        this.msg = "अवकाश (दिन में), अधिकतम अवकाश से अधिक नहीं हो सकता है. पंक्ति - " + (<string><unknown>i + 1);
        this.toastrService.error(this.msg);
        return;
      }
      else if (this.faleave.at(i).get('ddlleavetype')?.value == "4" && (!this.selectedFile)) {
        this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        this.msg = "मेडिकल सर्टिफिकेट अपलोड करें .";
        this.toastrService.error(this.msg);
        return;
      }

      else {
        if (i == 0)
          fromdate = fafromdate;

        if (i == this.groupcount)
          todate = fatodate;

        var tfrmdate = this.faleave.at(i).get('txtfromdate')?.value;
        var ttodate = this.faleave.at(i).get('txttodate')?.value;

        let days =
          Math.floor((Date.UTC(ttodate.getFullYear(), ttodate.getMonth(), ttodate.getDate()) -
            Date.UTC(tfrmdate.getFullYear(), tfrmdate.getMonth(), tfrmdate.getDate())) / (1000 * 60 * 60 * 24));

        if (this.faleave.at(i).get('ddlleavetype')?.value == "1" && (fafromday == "2" || fatoday == "2")) {

          if (days == 0) {
            if (fafromnoon == "1" && fatonoon == "2") {
              this.pushleavedetail(1, fafromdate + " 10:00:00.000", fatodate + " 17:00:00.000", fafromday, fatoday, fafromnoon, fatonoon, lvdays);
            }
            else if (fafromnoon == "1" && fatonoon == "1") {
              this.pushleavedetail(1, fafromdate + " 10:00:00.000", fatodate + " 13:00:00.000", fafromday, fatoday, fafromnoon, fatonoon, lvdays);

              if (i == this.groupcount)
                todate = fatodate + " 13:00:00.000";
            }
            else if (fafromnoon == "2" && fatonoon == "2") {
              this.pushleavedetail(1, fafromdate + " 14:00:00.000", fatodate + " 17:00:00.000", fafromday, fatoday, fafromnoon, fatonoon, lvdays);
              if (i == 0)
                fromdate = fafromdate + " 14:00:00.000";
            }
          }
          if (days >= 1) {
            //console.log(days);
            //FD - FN
            if (fafromday == "1" && fatonoon == "1") {
              this.pushleavedetail(1, fafromdate + " 10:00:00.000", fatodate + " 13:00:00.000", fafromday, fatoday, fafromnoon, fatonoon, lvdays);
              if (i == this.groupcount)
                todate = fatodate + " 13:00:00.000";
            }
            //FD - AN
            else if (fafromday == "1" && fatonoon == "2") {
              this.pushleavedetail(1, fafromdate + " 10:00:00.000", <string>this.datepipe.transform(this.addDays(new Date(ttodate), -1), 'yyyy-MM-dd') + " 17:00:00.000", 1, 1, "", "", (lvdays - 0.5));
              this.pushleavedetail(1, fatodate + " 14:00:00.000", fatodate + " 17:00:00.000", 2, 2, 2, 2, 0.5);
              extracount = 1;
            }
            //FN - FD
            else if (fafromnoon == "1" && fatoday == "1") {
              this.pushleavedetail(1, fafromdate + " 10:00:00.000", fafromdate + " 13:00:00.000", fafromday, fafromday, fafromnoon, fafromnoon, 0.5);
              this.pushleavedetail(1, <string>this.datepipe.transform(this.addDays(new Date(tfrmdate), 1), 'yyyy-MM-dd') + " 10:00:00.000", fatodate + " 17:00:00.000", fatoday, fatoday, fatonoon, fatonoon, (lvdays - 0.5));
              extracount = 1;
            }
            //AN - FD
            else if (fafromnoon == "2" && fatoday == "1") {
              this.pushleavedetail(1, fafromdate + " 14:00:00.000", fatodate + " 17:00:00.000", fafromday, fatoday, fafromnoon, fatonoon, lvdays);
              if (i == 0)
                fromdate = fafromdate + " 14:00:00.000";
            }
            //FN - FN
            else if (fafromnoon == "1" && fatonoon == "1") {
              this.pushleavedetail(1, fafromdate + " 10:00:00.000", fafromdate + " 13:00:00.000", fafromday, fafromday, fafromnoon, fafromnoon, 0.5);
              this.pushleavedetail(1, <string>this.datepipe.transform(this.addDays(new Date(tfrmdate), 1), 'yyyy-MM-dd') + " 10:00:00.000", fatodate + " 13:00:00.000", fatoday, fatoday, fatonoon, fatonoon, (lvdays - 0.5));
              extracount = 1;
              if (i == this.groupcount)
                todate = fatodate + " 13:00:00.000";
            }
            //FN - AN
            else if (fafromnoon == "1" && fatonoon == "2") {
              this.pushleavedetail(1, fafromdate + " 10:00:00.000", fafromdate + " 13:00:00.000", fafromday, fafromday, fafromnoon, fafromnoon, 0.5);

              if (days > 1 && (lvdays - 1) > 0) {
                this.pushleavedetail(1, <string>this.datepipe.transform(this.addDays(new Date(tfrmdate), 1), 'yyyy-MM-dd') + " 10:00:00.000", <string>this.datepipe.transform(this.addDays(new Date(ttodate), -1), 'yyyy-MM-dd') + " 17:00:00.000", 1, 1, "", "", (lvdays - 1));
                extracount = 2;
              }
              else
                extracount = 1;
              this.pushleavedetail(1, fatodate + " 14:00:00.000", fatodate + " 17:00:00.000", fatoday, fatoday, fatonoon, fatonoon, 0.5);
            }
            //AN - FN
            else if (fafromnoon == "2" && fatonoon == "1") {
              this.pushleavedetail(1, fafromdate + " 14:00:00.000", fatodate + " 13:00:00.000", fafromday, fatoday, fafromnoon, fatonoon, lvdays);
              if (i == 0)
                fromdate = fafromdate + " 14:00:00.000";

              if (i == this.groupcount)
                todate = fatodate + " 13:00:00.000";
            }
            //AN - AN
            else if (fafromnoon == "2" && fatonoon == "2") {
              this.pushleavedetail(1, fafromdate + " 14:00:00.000", <string>this.datepipe.transform(this.addDays(new Date(ttodate), -1), 'yyyy-MM-dd') + " 17:00:00.000", fafromday, 1, fafromnoon, "", (lvdays - 0.5));
              this.pushleavedetail(1, fatodate + " 14:00:00.000", fatodate + " 17:00:00.000", fatoday, fatoday, fatonoon, fatonoon, 0.5);
              extracount = 1;
              if (i == 0)
                fromdate = fafromdate + " 14:00:00.000";
            }
          }
        }
        else {
          this.frmtoleave.push(
            {
              LeaveId: this.faleave.at(i).get('ddlleavetype')?.value,
              FromDate: fafromdate + " 10:00:00.000",
              ToDate: fatodate + " 17:00:00.000",
              FromDay: this.faleave.at(i).get('ddlfromday')?.value != "" ? this.faleave.at(i).get('ddlfromday')?.value : 0,
              ToDay: this.faleave.at(i).get('ddltoday')?.value != "" ? this.faleave.at(i).get('ddltoday')?.value : 0,
              FromNoon: this.faleave.at(i).get('ddlfromnoon')?.value != "" ? this.faleave.at(i).get('ddlfromnoon')?.value : 0,
              ToNoon: this.faleave.at(i).get('ddltonoon')?.value != "" ? this.faleave.at(i).get('ddltonoon')?.value : 0,
              LeaveDays: this.faleave.at(i).get('txtleavedays')?.value
            })
        }

        if (<number>this.faleave.at(i).get('txtleavedays')?.value > maxleave) {
          maxleave = <number>this.faleave.at(i).get('txtleavedays')?.value;
          leaveid = this.faleave.at(i).get('ddlleavetype')?.value;
        }
        totleaves = totleaves + <number>this.faleave.at(i).get('txtleavedays')?.value;
      }
    }

    //console.log(this.frmtoleave);
    let formData = new FormData();
    formData.append("EmployeeId", <string>sessionStorage.getItem("UserID"));
    formData.append("LId", "");
    formData.append("LeaveType", body['ddlleaveappltype']);
    formData.append("LeaveId", <string><unknown>leaveid); 
    formData.append("Reason", body['txtreason'].trim());
    formData.append("ExtendedAgainstLId", this.extendleaveidform.controls['hdnLid'].value);
    formData.append("FromDate", <string>fromdate);
    formData.append("ToDate", <string>todate);
    formData.append("LeaveDays", <string><unknown>totleaves);
    formData.append("IsOutOfStation", body['ddlstationleave']);
    formData.append("AddressDuringLeave", body['txtaddressduringleave'].trim());
    formData.append("Remarks", body['txtremarks'] == null ? "" : body['txtremarks'].trim());
    formData.append("UploadAppPath", this.selectedFile);
    formData.append("LeaveDetail", JSON.stringify(this.frmtoleave));
    formData.append("LeaveTypeCount", <string><unknown>(this.groupcount + extracount));

    this.leave.saveextendleave('leaveService/saveextendleave', formData).subscribe((res: any) => {
      console.log(res) 
      if (<number>res.data[0][0].StatusNo == 1) {
        this.extendleaveidform.reset();
        // this.msgCls = "alert bg-light-success alert-dismissible mb-2";
        this.msg = " अवकाश के लिए आवेदन सफलतापूर्वक सुरक्षित कर लिया गया है| आपका आवेदन क्रमांक - " + res.data[0][0].Msg + " है| आपका आवेदन " + res.data[0][0].Msg2;//+" के पास स्वीकृति के लिए भेजा गया है|"
        this.showvali = true;
        this.resetForm();
        this.submitted = false;
        // this.toastrService.success(this.msg);
        setTimeout(() => {
          this._router.navigateByUrl("leave/extendLeave");
        }, 3000);  //3 second

      } else if (<number>res.data[0][0].StatusNo == 2) {
        this.showvali = true;
        this.msgCls = "alert bg-light-danger alert-dismissible mb-2";
        //this.msg = "अवकाश के लिए यह आवेदन आपके द्वारा पहले ही किया जा चुका है.";
        this.msg = res.data[0][0].Msg;
        this.toastrService.error(this.msg);
      }
    })
  }

  private pushleavedetail(faLvId: number, fafromdate: string, fatodate: string, fafromday: any, fatoday: any,
    fafromnoon: any, fatonoon: any, fadays: any) {
    this.frmtoleave.push(
      {
        LeaveId: faLvId,
        FromDate: fafromdate,
        ToDate: fatodate,
        FromDay: fafromday != "" ? fafromday : 0,
        ToDay: fatoday != "" ? fatoday : 0,
        FromNoon: fafromnoon != "" ? fafromnoon : 0,
        ToNoon: fatonoon != "" ? fatonoon : 0,
        LeaveDays: fadays
      })
  }

  private resetForm() {
    this.selectedFile = null;

    // if (this.extendleaveidform.controls.ddlfromday)
    // this.extendleaveidform.controls.ddlfromday.setValue("");
    // this.extendleaveidform.controls.ddltoday.setValue("");
    // this.extendleaveidform.controls.ddlfromnoon.setValue("");
    // this.extendleaveidform.controls.ddltonoon.setValue("");
    // if (this.extendleaveidform.controls.ddlfromday)
    // this.extendleaveidform.controls.ddlfromday.setValue("");
    // this.extendleaveidform.controls.ddltoday.setValue("");
    // this.extendleaveidform.controls.ddlfromnoon.setValue("");
    // this.extendleaveidform.controls.ddltonoon.setValue("");
    this.extendleaveidform.controls['ddlstationleave'].setValue("");
    this.extendleaveidform.controls['ddlleaveappltype'].patchValue("1");
    this.faleave.at(0).get('ddlleavetype')?.patchValue("");
    this.extendleaveidform.controls['txtremarks'].patchValue("");
    this.removeLeaveTypes();
    this.frmtoleave = [];
    this.lessleavedays = [];
  }
}
