import { Component } from '@angular/core';
import { FormControl, FormGroup, FormControlName,FormBuilder , Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/leave.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  constructor( private _fb : FormBuilder ,  private leave: LeaveService, private location: Location ) { }


  updatePasswordForm : FormGroup = this._fb.group({
    userID: [''],
    OldPassword: [''],
    NewPassword: [''], 
    ConfirmPassword: [''],
  });

  showvali: boolean = false;
  msg: string = "";
  msgCls = "alert alert-warning alert-dismissible fade show";


  updateUserPW(){
    // console.log(this.updatePasswordForm.value);
    this.leave.updatepwService('leave/updatePassword',this.updatePasswordForm.value).subscribe((res : any) => {
      console.log(res);
      this.showvali = true;
      this.msgCls = "alert alert-warning alert-dismissible fade show"; 
      this.msg = res.msg
    })
  }

  back(): void {
    this.location.back();
  }


}
