export class FromToLeave {
  LeaveId: number | null;
  FromDate: string | null;
  ToDate: string | null;
  FromDay: number | null;
  ToDay: number | null;
  FromNoon: number | null;
  ToNoon: number | null;
  LeaveDays: number | null;

  constructor() {
    this.LeaveId = null;
    this.FromDate = null;
    this.ToDate = null;
    this.FromDay = null;
    this.ToDay = null;
    this.FromNoon = null;
    this.ToNoon = null;
    this.LeaveDays = null;
  }

}

export class ApplyLeave {

  TeacherCode: string | null;
  ApplicationId: number | null;
  LeaveType: number | null;
  Reason: string | null;
  ExtendedAgainstApplicationId: number | null;
  IsOutOfStation: boolean | null;
  AddressDuringLeave: string | null;
  Remarks: string | null;
  UploadAppPath: any | null;
  Leaves: FromToLeave[] | null;

  constructor() {

    this.TeacherCode = null;
    this.ApplicationId = null;
    this.LeaveType = null;
    this.Reason = null;
    this.ExtendedAgainstApplicationId = null;
    this.IsOutOfStation = null;
    this.AddressDuringLeave = null;
    this.Remarks = null;
    this.UploadAppPath = null;
    this.Leaves = null;
  }
}

export class CancelLeave {
  EmployeeId: string | null;
  LId: number | null;
  Reason: string | null;
  CancelType: number | null;

  constructor() {
    this.EmployeeId = null;
    this.LId = null;
    this.Reason = null;
    this.CancelType = null;
  }
}

export class JoinLeave {
    
  EmployeeId: string | null;
  LId: number | null;
  JoiningDate:string | null;
  
  constructor() {
    this.EmployeeId = null;
    this.LId = null;
    this.JoiningDate = null;       
  }
}

export class UpdateStatus {
  StatusId: number | null;
  EmployeeId: string | null;
  LId: number | null;
  remarks:string | null;
  bulkstatus:UpdateStatusBulk[]|null;
  LeaveCount: number | null;
  
  constructor() {
    this.StatusId = null;
    this.EmployeeId = null;
    this.LId = null;
    this.remarks = null; 
    this.bulkstatus = null; 
    this.LeaveCount = null;
  }
}

export class UpdateStatusBulk {
  StatusId: number | null;
  LId: number | null;
  Remarks:string | null;
  
  constructor() {
    this.StatusId = null;
    this.LId = null;
    this.Remarks = null; 
  }
}
