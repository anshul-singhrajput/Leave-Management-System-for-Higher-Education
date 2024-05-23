import { Component } from '@angular/core';

// Added
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-extend-leave',
  templateUrl: './extend-leave.component.html',
  styleUrls: ['./extend-leave.component.css']
})
export class ExtendLeaveComponent {

  constructor(private _fb: FormBuilder,
    public datepipe: DatePipe,
    private _router: Router,
    private _applservice: LeaveService,
  ) { }

  ngOnInit(): void {
    this._applservice.getleaves('leaveService/getleaves', <string>sessionStorage.getItem("UserID")).subscribe((res:any) => {

      console.log(res);
      if (res.status == 200) {
        this.leaves = res.data[0];
        // for (let i = 0; i < result.length; i++) {
        //   this.addbtn();
        // }      
      }

    })
  }

  extendleaveform: FormGroup = this._fb.group({
    extendl: this._fb.array([
      //this.addrolesfb() 
    ])
  });

  leaves: any = [];
  fabtns: FormArray = (<FormArray>this.extendleaveform.get('extendl'));
   
}
