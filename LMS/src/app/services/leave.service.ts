import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { catchError, map, tap } from 'rxjs';
import { UpdateStatus } from '../models/models/applyleave.model';
@Injectable({
  providedIn: 'root'
})
export class LeaveService {


  constructor(private http: HttpClient) { }


  //apply leave form service
  applyLeaveService(leaveData: any, data: any) {
    return this.http.post(config.apiUrl + leaveData, data);
  }

  //Get Leave Type Mapped
  getleavemapping(functionName: any, leaveid: any, genderId: any) {
    return this.http.get(config.apiUrl + functionName + leaveid + genderId).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  //get Apply Leave fill data
  filldata(functionName: any, leaveid: string, userID: string) {
    return this.http.get(config.apiUrl + functionName + leaveid + userID).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  // getMaxLeave as per userCode
  getmaxleave(functionName: any, leaveid: string, UserID: string) {
    return this.http.get(config.apiUrl + functionName + leaveid + UserID).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

  //Leave Date Validate
  validateholiday(functionName: any, leaveid: string, fromdate: string, todate: string, isdisable: string) {
    return this.http.get(config.apiUrl + functionName + leaveid + '/' + fromdate + '/' + todate + '/' + isdisable).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }))
  }

    // Save Leave Form
    saveleave(functionName:any, data:any){
      return this.http.post(config.apiUrl + functionName , data).pipe(map((res:any) =>{
        return res;
      })); 
    }

    //----------------- Extend Leave Service Start ------------

getleaves(functionName:any, userID:string){
  return this.http.get(config.apiUrl + functionName +'/'+ userID).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

// Save Extended Leave
saveextendleave(functionName:any, data:any){
  return this.http.post(config.apiUrl + functionName , data).pipe(map((res:any) =>{
    return res;
  })); 
}

filldataForExtend(functionName:any, applicationid:string){
  return this.http.get(config.apiUrl + functionName + applicationid).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

// Cancel Leave Component

getleavescancel(functionName:any, applicationid:string){
  return this.http.get(config.apiUrl + functionName + applicationid).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//cancel Leave
cancelleave(functionName:any, data:any){
  return this.http.post(config.apiUrl + functionName , data).pipe(map((res:any) =>{
    return res;
  })); 
}

// get Join Leave
getleavesjoining(functionName:any, applicationid:string){
  return this.http.get(config.apiUrl + functionName + applicationid).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//Join Leave
joinleave(functionName:any, data:any){
  return this.http.post(config.apiUrl + functionName , data).pipe(map((res:any) =>{
    return res;
  })); 
}

// get Join Leave
getLeaveApplicationStatus(functionName:any, userID:string){
  return this.http.get(config.apiUrl + functionName + userID).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//Get Leave Application History
getLeaveApplicationHistory(functionName:any, userID:string){
  return this.http.get(config.apiUrl + functionName + userID).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//Get Holiday Information
getHolidayInformation(functionName:any, holiday:number){
  return this.http.get(config.apiUrl + functionName + holiday).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//Get Leave Dashboard
getLeaveDashboard(functionName:any, userID:string){
  return this.http.get(config.apiUrl + functionName + userID).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//Get Leave Approve
getleavesapprove(functionName:any, userID:string){
  return this.http.get(config.apiUrl + functionName + userID).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//ApproveLeave Update 
updatestatus(functionName:any, data:UpdateStatus){
  return this.http.post(config.apiUrl + functionName , data).pipe(map((res:any) =>{
    return res;
  })); 
}

//For print application pdf
getprintdata(functionName:any, LId: string){
  return this.http.get(config.apiUrl + functionName + '/' + LId).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//for print application number
getapplicationNo(functionName:any){
  return this.http.get(config.apiUrl + functionName).pipe(tap(res => res), catchError(e => {
    throw new Error(e);
  }))
}

//update old password with new one
updatepwService(functionName:any, data:any){
  return this.http.post(config.apiUrl + functionName , data).pipe(map((res:any) =>{
    return res;
  })); 
}

}

