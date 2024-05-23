var config = require('../dbConfig');
const sql = require('mssql');

async function filldata(LeaveId, userID) {
    try {

        let pool = await sql.connect(config);
        let results = await pool.request()

            .input('LeaveId', sql.TinyInt, LeaveId)
            .input('rmn', sql.VarChar(11), userID)

            .query(`SELECT [LeaveId],[LeaveName]
            FROM [dbo].[LeaveMaster] Where LeaveId in (1,2,3,4,7,10);
            
            Select typegender as GenderId,address From tTeacherProfile Where rmn = @rmn`);

        return results;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMaxLeave(leaveid, UserID) {

    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('LeaveId', sql.TinyInt, leaveid)
            .input('EmployeeId', sql.VarChar(10), UserID)
            .query(`Declare @Year smallint = Year(getdate())

        if exists (Select LeaveBalance From EmployeeLeaveBalance Where CalYear = @Year and EmployeeId = @EmployeeId and LeaveId = @LeaveId)
        Begin
            Select min (LeaveBalance)  MaxLeave From
            (Select LeaveBalance From EmployeeLeaveBalance Where CalYear = @Year and EmployeeId = @EmployeeId and LeaveId = @LeaveId
            Union All
            Select MaxLeave From Leavemaster Where LeaveId = @LeaveId
            )dt
        End 
        Else
        Select 0 as MaxLeave;`);

        return results;

    }
    catch (error) {
        // _error.saverrorlogN2("getTeacherProfileInfo,",error,userid,"TeacherEst");
        console.log(error);
    }

}

async function getLeaveMapping(LeaveId,GenderId) {
    try {

        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('LeaveId', sql.TinyInt, LeaveId)
            .input('GenderId', sql.TinyInt, GenderId)
            .query(`If (@GenderId = 1)
            Select L.LeaveId,L.LeaveName From LeaveMaster L
            Inner Join [LeaveMappingMaster] LM On LM.MappingLeaveId = L.LeaveId
            Where  LM.LeaveId = @LeaveId And L.LeaveId not in (5,8) Order By L.LeaveId
            Else If (@GenderId = 2)
            Select L.LeaveId,L.LeaveName From LeaveMaster L
            Inner Join [LeaveMappingMaster] LM On LM.MappingLeaveId = L.LeaveId
            Where  LM.LeaveId = @LeaveId And L.LeaveId <> 6 Order By L.LeaveId
            Else
            Select L.LeaveId,L.LeaveName From LeaveMaster L
            Inner Join [LeaveMappingMaster] LM On LM.MappingLeaveId = L.LeaveId
            Where  LM.LeaveId = @LeaveId And L.LeaveId <> 6 Order By L.LeaveId`);

        //console.log(filldata.recordsets);
        return results;
    }
    catch (error) {
        // _error.saverrorlogN2("getLeaveMapping,",error,userid,"TeacherEst");
        console.log(error);
    }
}

async function validateholiday(LeaveId, FromDate, ToDate, IsFrmDisable) {
    console.log(LeaveId, FromDate, ToDate, IsFrmDisable)
    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('LeaveId', sql.TinyInt, LeaveId != "0" ? LeaveId : null)
            .input('FromDate', sql.Date, FromDate != "0" ? FromDate : null)
            .input('ToDate', sql.Date, ToDate != "0" ? ToDate : null)
            .input('IsFrmDisable', sql.Bit, IsFrmDisable == "1" ? true : false)
            .execute('ValidateHoliday');
        return results;
    }
    catch (error) {
        // _error.saverrorlogN2("validateholiday,",error,userid,"TeacherEst");
        console.log(error);
    }
}

// save Leave
async function saveLeave(aplleave) {
    try {
        var jsonobj = JSON.parse(aplleave.LeaveDetail);
        var tblleave = new sql.Table();


        tblleave.columns.add('SNo', sql.Int);
        tblleave.columns.add('LeaveId', sql.TinyInt);
        tblleave.columns.add('FromDate', sql.VarChar(25));
        tblleave.columns.add('ToDate', sql.VarChar(25));
        tblleave.columns.add('FromDay', sql.TinyInt);
        tblleave.columns.add('ToDay', sql.TinyInt);
        tblleave.columns.add('FromNoon', sql.TinyInt);
        tblleave.columns.add('ToNoon', sql.TinyInt);
        tblleave.columns.add('LeaveDays', sql.Decimal(8, 1));

        for (var i = 0; i <= aplleave.LeaveTypeCount; i++) {
            tblleave.rows.add((i + 1)
                , jsonobj[i].LeaveId
                , jsonobj[i].FromDate
                , jsonobj[i].ToDate
                , jsonobj[i].FromDay == 0 ? null : jsonobj[i].FromDay
                , jsonobj[i].ToDay == 0 ? null : jsonobj[i].ToDay
                , jsonobj[i].FromNoon == 0 ? null : jsonobj[i].FromDay
                , jsonobj[i].ToNoon == 0 ? null : jsonobj[i].ToDay
                , jsonobj[i].LeaveDays
            );
        }
        console.log(tblleave);

        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('EmployeeId', sql.VarChar(11), aplleave.EmployeeId)
            .input('LId', sql.Int, aplleave.LId == 0 ? null : aplleave.LId)
            .input('LeaveType', sql.TinyInt, aplleave.LeaveType)
            .input('LeaveId', sql.TinyInt, aplleave.LeaveId)
            .input('Reason', sql.NVarChar(200), aplleave.Reason)
            .input('ExtendedAgainstLId', sql.Int, aplleave.ExtendedAgainstLId == 0 ? null : aplleave.ExtendedAgainstLId)
            .input('FromDate', sql.VarChar(25), aplleave.FromDate)
            .input('ToDate', sql.VarChar(25), aplleave.ToDate)
            .input('LeaveDays', sql.Decimal(8, 1), aplleave.LeaveDays)
            .input('IsOutOfStation', sql.Bit, aplleave.IsOutOfStation == "1" ? true : false)
            .input('AddressDuringLeave', sql.NVarChar(100), aplleave.AddressDuringLeave)
            .input('Remarks', sql.NVarChar(500), aplleave.Remarks != "" ? aplleave.Remarks : null)
            .input('UploadAppPath', sql.VarChar(100), aplleave.UploadAppPath != "" ? aplleave.UploadAppPath : null)
            .input('LeaveDetail', tblleave)
            .execute('SaveLeaveApplication');
        return results;
    }
    catch (error) {
        // _error.saverrorlogN2("getTeacherProfileInfo,",error,userid,"TeacherEst");
        console.log(error);
    }

}

// Get Leaves for Extend List
async function getleaves(userID) {
    try {

        let pool = await sql.connect(config);
        let results = await pool.request()

            .input('userID', sql.VarChar(11), userID)
            .query(`Select TLA.LId, ApplicationId, LM.LeaveName, TLA.Reason, Convert(varchar(10),TLA.FromDate,103)FromDate,Convert(varchar(10),TLA.ToDate,103)ToDate, LeaveDays 
            ,IsExtended From LeaveApplicationMain TLA
             Inner Join LeaveMaster LM On LM.LeaveId = TLA.LeaveId
             Where EmployeeId = @userID and TLA.CurrentStatus in (1,2,3,4) and TLA.ToDate>=getdate()`)
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

// Get Leaves for Extend form
async function GetLeaveForExtend(ApplicationId) {
    try {

        let pool = await sql.connect(config);
        let results = await pool.request()

            .input('ApplicationId', sql.Int, ApplicationId)
            .execute('GetLeaveForExtend')
        return results;
    }
    catch (error) {
        console.log(error);
    }
}


//save Extend Leave Application

async function saveextendleave(aplleave) {
    try {
        var jsonobj = JSON.parse(aplleave.LeaveDetail);
        var tblleave = new sql.Table();


        tblleave.columns.add('SNo', sql.Int);
        tblleave.columns.add('LeaveId', sql.TinyInt);
        tblleave.columns.add('FromDate', sql.VarChar(25));
        tblleave.columns.add('ToDate', sql.VarChar(25));
        tblleave.columns.add('FromDay', sql.TinyInt);
        tblleave.columns.add('ToDay', sql.TinyInt);
        tblleave.columns.add('FromNoon', sql.TinyInt);
        tblleave.columns.add('ToNoon', sql.TinyInt);
        tblleave.columns.add('LeaveDays', sql.Decimal(8, 1));

        for (var i = 0; i <= aplleave.LeaveTypeCount; i++) {
            tblleave.rows.add((i + 1)
                , jsonobj[i].LeaveId
                , jsonobj[i].FromDate
                , jsonobj[i].ToDate
                , jsonobj[i].FromDay == 0 ? null : jsonobj[i].FromDay
                , jsonobj[i].ToDay == 0 ? null : jsonobj[i].ToDay
                , jsonobj[i].FromNoon == 0 ? null : jsonobj[i].FromDay
                , jsonobj[i].ToNoon == 0 ? null : jsonobj[i].ToDay
                , jsonobj[i].LeaveDays
            );
        }
        //console.log(tblleave);

        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('EmployeeId', sql.VarChar(11), aplleave.EmployeeId)
            .input('LId', sql.Int, aplleave.LId == 0 ? null : aplleave.LId)
            .input('LeaveType', sql.TinyInt, aplleave.LeaveType)
            .input('LeaveId', sql.TinyInt, aplleave.LeaveId)
            .input('Reason', sql.NVarChar(200), aplleave.Reason)
            .input('ExtendedAgainstLId', sql.Int, aplleave.ExtendedAgainstLId == 0 ? null : aplleave.ExtendedAgainstLId)
            .input('FromDate', sql.VarChar(25), aplleave.FromDate)
            .input('ToDate', sql.VarChar(25), aplleave.ToDate)
            .input('LeaveDays', sql.Decimal(8, 1), aplleave.LeaveDays)
            .input('IsOutOfStation', sql.Bit, aplleave.IsOutOfStation == "1" ? true : false)
            .input('AddressDuringLeave', sql.NVarChar(100), aplleave.AddressDuringLeave)
            .input('Remarks', sql.NVarChar(500), aplleave.Remarks != "" ? aplleave.Remarks : null)
            .input('UploadAppPath', sql.VarChar(100), aplleave.UploadAppPath != "" ? aplleave.UploadAppPath : null)
            .input('LeaveDetail', tblleave)
            .execute('SaveExtendLeaveApplication');
        return results;
    }
    catch (error) {
        // _error.saverrorlogN2("getTeacherProfileInfo,",error,userid,"TeacherEst");
        console.log(error);
    }

}

// Get Leaves for cancel List
async function getleavescancel(userID) {
    try {

        let pool = await sql.connect(config);
        let results = await pool.request()

            .input('userID', sql.VarChar(11), userID)
            .query(`Select TLA.LId,TLA.ApplicationId,TLA.Reason,Convert(varchar(10),TLA.FromDate,103)+ '- '+Convert(varchar(10),TLA.ToDate,103) FromToDate, TLA.LeaveDays,dt.IsExtended ,
            (Select ',' + LM.LeaveName  From LeaveApplicationDetail LAD
            Inner Join LeaveMaster LM On LM.LeaveId = LAD.LeaveId Where LAD.LId = TLA.LId Group by LM.LeaveName for XML path ('')) LeaveNames
            From LeaveApplicationMain TLA
            outer apply (Select Convert(bit,LA2.LId) IsExtended
            From LeaveApplicationMain LA2 Where LA2.ExtendedAgainstLId = TLA.LId and LA2.CurrentStatus in (1,2,3,4))dt
            Where EmployeeId = @userID and TLA.CurrentStatus in (1,2,3,4) --and TLA.ToDate<=getdate()`)
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

async function cancelleave(leavedata) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()

            .input('EmployeeId', sql.VarChar(11), leavedata.EmployeeId)
            .input('LId', sql.Int, leavedata.LId)
            .input('Reason', sql.NVarChar(500), leavedata.Reason)
            .input('CancelType', sql.TinyInt, leavedata.CancelType)
            .execute(`CancelLeave`);

        return result;
    }
    catch (error) {
        console.log(error);
    }
}

// Get Leaves for Join List
async function getleavesjoin(userID) {
    try {

        let pool = await sql.connect(config);
        let results = await pool.request()

            .input('userID', sql.VarChar(11), userID)
            .query(`Select TLA.LId,TLA.ApplicationId,Convert(varchar(10),TLA.FromDate,105)+ N' से '+Convert(varchar(10),TLA.ToDate,105) FromToDate,TLA.Prefix+ ' & '+TLA.Suffix PrefixSuffix, 
            (Select ',' + LM.LeaveName  From LeaveApplicationDetail LAD
            Inner Join LeaveMaster LM On LM.LeaveId = LAD.LeaveId Where LAD.LId = TLA.LId Group by LM.LeaveName for XML path ('')) LeaveNames,ToDate
            From LeaveApplicationMain TLA
            Inner Join (Select LId From LeaveApplicationDetail Where LeaveId in (2,3,4,5,6,8) Group By LId)dt On dt.LId = TLA.LId
            Where EmployeeId = @userID and TLA.CurrentStatus = 4 and TLA.JoinedAfterLeave is null --and TLA.ToDate<getdate()`)
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

//Join Leave
async function joinleave(leavedata) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('EmployeeId', sql.VarChar(11), leavedata.EmployeeId)
            .input('LId', sql.Int, leavedata.LId)
            .input('JoiningDate', sql.Date, leavedata.JoiningDate)
            .execute(`JoinLeave`);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

//get Leave Status
async function getLeaveApplicationStatus(userID) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('empid', sql.VarChar(11), userID)
            .execute('TEleaveApplicationStatus');
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

//get Leave Status
async function getLeaveApplicationHistoryCurrentYear(userID) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('empid', sql.VarChar(11), userID)
            .execute('TEleaveApplicationHistory');
        return result;
    }
    catch (error) {
        console.log(error);
    }
}   

//get Holiday
async function getHolidayInformationReport(HolidayType) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('holiday', sql.TinyInt, HolidayType)
            .execute('TEHolidayInformation');
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

//get Leave Status
async function getLeaveDashboard(userID) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('empid', sql.VarChar(11), userID)
            .execute('TEDashboard');
        return result;
    }
    catch (error) {
        console.log(error);
    }
}  

//get Leave for Approval
async function getLeavesApprove(userID) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('EmployeeId', sql.VarChar(11), userID)
            .execute(`GetLeaveForApprove`);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

// Update Approve Leave status
async function updateleavestatus(leavedata) {
    try {

        var tblleave = new sql.Table();

        // console.log(leavedata.bulkstatus);
        tblleave.columns.add('LId', sql.Int);
        tblleave.columns.add('StatusId', sql.TinyInt);
        tblleave.columns.add('Remarks', sql.NVarChar(500));

        let pool = await sql.connect(config);
        let result = await pool.request()

            .input('EmployeeId', sql.VarChar(11), leavedata.EmployeeId)
            .input('StatusId', sql.TinyInt, leavedata.StatusId)
            .input('LId', sql.Int, leavedata.LId)
            .input('Remarks', sql.NVarChar(500), leavedata.remarks == "" ? null : leavedata.remarks)
            .input('UpdateType', sql.TinyInt, 1)
            .input('LeaveStatus', tblleave)
            .execute(`UpdateLeaveStatus`);
            
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

//get Admin Leave for Approval
async function getAdminLeavesApprove(userID) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('EmployeeId', sql.VarChar(11), userID)
            .execute(`GetAdminLeaveForApprove`);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

// get data for pdf print
async function getDataForPdf(LId) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('LId', sql.Int, LId)
            .query(`
            select ed.EmpName , ed.ReportingoffcEmployeeDesignation , lm.LId , lm.EmployeeId ,l.LeaveName,
            lm.ApplicationId , lm.Reason , lm.FromDate ,
            lm.ToDate , lm.LeaveDays , lm.Remarks , lm.AppliedDate ,
            lm.AddressDuringLeave , lm.IsOutOfStation , lm.Prefix ,lm.Suffix 
            from LeaveApplicationMain lm
            inner join EmployeeDetail ed on ed.EmployeeId = lm.EmployeeId
            inner join LeaveMaster l on l.LeaveId = lm.LeaveId
            where lm.LId = @LId 
            
            select el.LeaveBalance from EmployeeLeaveBalance el
            inner join LeaveApplicationMain lm on el.EmployeeId = lm.EmployeeId
            where lm.LId =@LId `);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

//get data for state admin dashboard
async function getDataforStateadmin() {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
            .query(`	select
            count(*) as TA , 
            count(case when CurrentStatus = 4 then CurrentStatus end) as AA,
            count(case when CurrentStatus = 5 then CurrentStatus end) as DA ,
		    count(case when LeaveId = 1 then LeaveId end) as CL ,
			count(case when LeaveId = 2 then LeaveId end) as EL ,
			count(case when LeaveId = 3 then LeaveId end) as HPL ,
			count(case when LeaveId = 7 then LeaveId end) as RL
        from
            LeaveApplicationMain;`);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

//update old password with new one
async function UpdatePassword(updatepassword) {
    try {

        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('userID', sql.NVarChar(50), updatepassword.userID )
        .input('OldPassword', sql.NVarChar(100), updatepassword.OldPassword)
        .input('NewPassword', sql.NVarChar(100),updatepassword.NewPassword)
        .input('ConfirmPassword', sql.NVarChar(100), updatepassword.ConfirmPassword)
        .execute(`UpdatePassword`);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}






module.exports = {
    getLeaveMapping : getLeaveMapping ,
    filldata : filldata,
    getMaxLeave : getMaxLeave ,
    validateholiday : validateholiday,
    saveLeave: saveLeave,
    saveextendleave : saveextendleave ,
    getleaves : getleaves , 
    GetLeaveForExtend : GetLeaveForExtend , 
    getleavescancel :  getleavescancel ,
    cancelleave : cancelleave ,
    getleavesjoin : getleavesjoin ,
    joinleave : joinleave ,
    getLeaveApplicationStatus : getLeaveApplicationStatus ,
    getLeaveApplicationHistoryCurrentYear :  getLeaveApplicationHistoryCurrentYear ,
    getHolidayInformationReport : getHolidayInformationReport ,
    getLeaveDashboard : getLeaveDashboard ,
    getLeavesApprove : getLeavesApprove ,
    updateleavestatus :  updateleavestatus ,
    getAdminLeavesApprove :  getAdminLeavesApprove ,
    getDataForPdf :  getDataForPdf ,
    getDataforStateadmin : getDataforStateadmin ,
    UpdatePassword : UpdatePassword ,
}



