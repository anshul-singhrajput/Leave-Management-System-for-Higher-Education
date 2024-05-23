var config = require('../dbConfig');
// const sql = require('mssql/msnodesqlv8');
const sql = require('mssql');


async function getData() {

    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .query(`select * from userLevel`);

        return results;

    }
    catch (error) {
        // _error.saverrorlogN2("getTeacherProfileInfo,",error,userid,"TeacherEst");
        console.log(error);
    }

}

async function getDataa(userID) {

    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('input_parameter', sql.NVarChar, userID)
            .query(`select * from userLevel where userID = @input_parameter`);

        return results;

    }
    catch (error) {
        console.log(error);
    }

}


async function loginpost(userID, password) {

    try {
        let pool = await sql.connect(config);
        let results = await pool.request()
            .input('userID', sql.NVarChar(50), userID)
            .input('password', sql.VarChar(50), password)
            .query(`select l.userID, t.name,t.rmn, t.UdiseCode, l.userType, tm.UserTypeHin 
            from tTeacherProfile t Inner Join userLevel l on l.userID = t.rmn
            Inner join T_User_Type_Master tm on tm.UserTypeCode = l.userType
            where l.userID = @userID and l.password = @password
            Union all
            select sm.Principal_Mob as userID , sm.Principal_Na as name , sm.Principal_Mob as rmn , 
            sm.UDISEID as UdiseCode , ul.userType , tm.UserTypeHin from userLevel ul
            inner join SchoolMaster sm on sm.UDISEID = ul.userID
            inner join T_User_Type_Master tm on tm.UserTypeCode = ul.userType
            where sm.Principal_Mob = @userID and ul.password = @password 
            Union all
            select l.userID, t.name,t.rmn,t.UdiseCode, l.userType, tm.UserTypeHin 
            from AdminProfile t Inner Join userLevel l on l.userID = t.rmn
            Inner join T_User_Type_Master tm on tm.UserTypeCode = l.userType
            where l.userID = @userID and l.password = @password ;`);


        return results;

    }
    catch (error) {
        console.log(error);
    }

}


module.exports = {
    getData: getData,
    getDataa: getDataa,
    loginpost: loginpost
}
