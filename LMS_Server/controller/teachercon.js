var config = require('../dbConfig');
const sql = require('mssql');

async function getTData(rmn, UserTypeCode) {

    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('rmn', sql.VarChar(10), rmn)
            .input('userType', sql.VarChar(10), UserTypeCode)
            .query(`select t.name,t.rmn, t.UdiseCode, l.userType,tm.UserTypeHin,
            t.Date_of_appointment_in_present_Cadre,t.Date_of_joining_in_service 
            , t.typegender as gender , sm.SchoolName , D.NameEng as DistName     
            from tTeacherProfile t 
        Inner Join userLevel l on l.userID = t.rmn
        Inner join T_User_Type_Master tm on tm.UserTypeCode = l.userType
        Inner Join SchoolMaster sm on sm.ccode = t.ICode
		Inner Join TDistrict D on D.LGDDistCode = t.districtid
        where t.rmn = @rmn and l.userType = @userType;`);

        return results;

    }
    catch (error) {
        // _error.saverrorlogN2("getTeacherProfileInfo,",error,userid,"TeacherEst");
        console.log(error);
    }

}


async function getPData(rmn, UserTypeCode) {

    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('rmn', sql.VarChar(10), rmn)
            .input('userType', sql.VarChar(10), UserTypeCode)
            .query(`select sm.Principal_Na as name, sm.Principal_Mob as rmn,sm.UDISEID as UdiseCode, ul.userType, tm.UserTypeHin,t.Date_of_appointment_in_present_Cadre,t.Date_of_joining_in_service 
            ,sm.SchoolName, t.typegender as gender ,  D.NameEng as DistName
            from userLevel ul
            inner join SchoolMaster sm on sm.UDISEID = ul.userID
            Inner join T_User_Type_Master tm on tm.UserTypeCode = ul.userType
            Inner join tTeacherProfile t on t.rmn = sm.Principal_Mob
			Inner Join TDistrict D on D.LGDDistCode = t.districtid
            where sm.Principal_Mob = @rmn and ul.userType= @userType;`);

        return results;

    }
    catch (error) {
        // _error.saverrorlogN2("getTeacherProfileInfo,",error,userid,"TeacherEst");
        console.log(error);
    }

}

module.exports = {
    getTData: getTData,
    getPData : getPData,
   
}