var express = require('express');
var router = express.Router();
const applyLeaveController = require('../controller/applyleavecon');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getPdf/:LId', function (req, res, next) {
  // console.log(req.params.LId)
  // res.send("geted")
  // let LeaveID ;
  // LeaveID = parseInt();
  console.log(typeof req.params.LId);
  // console.log(LeaveID);
  // console.log(req.params.LId)
  applyLeaveController.getDataForPdf(req.params.LId).then(result => {
    // res.json({data: result});
    // console.log(result);
    if (result.recordsets) {
      res.json({
        data: result.recordsets,
        status: '200',
        msg: 'Data getted Successfully'
      });
    } else {
      res.json({
        data: null,
        status: '201',
        msg: 'Data is empty'
      });
    }
  })
});

router.get('/getALLApplication', function (req, res, next) {
  applyLeaveController.getDataforStateadmin().then(result => {
    // res.json({data: result});
    // console.log(result);
    if (result.recordsets) {
      res.json({
        data: result.recordsets,
        status: '200',
        msg: 'Data getted Successfully'
      });
    } else {
      res.json({
        data: null,
        status: '201',
        msg: 'Data is empty'
      });
    }
  })
});

router.post('/updatePassword', function (req, res, next) {
  let updatepassword = { ...req.body }
  console.log(updatepassword);
  //  console.log(req.params.userID,req.params.OldPassword, req.params.NewPassword, req.params.ConfirmPassword);
  applyLeaveController.UpdatePassword(updatepassword).then(result => {
    // res.json({data: result});
    console.log(result);
      if (result.rowsAffected > 0) {
        res.json({
          data: result.rowsAffected,
          status: '200',
          msg: 'Password updated successfully'
        });
      } else {
        res.json({
          data: result.rowsAffected,
          status: '400',
          msg: 'Invalid old password or New password and confirm password do not match'
        });
      }

    // if (result.returnValue === 0) {
    //   res.status(200).json({ message: 'Password updated successfully.' });
    // } else if (result.returnValue === 1) {
    //   res.status(400).json({ message: 'New password and confirm password do not match.' });
    // } else if (result.returnValue === 2) {
    //   res.status(400).json({ message: 'Invalid old password.' });
    // } else {
    //   res.status(500).json({ message: 'An error occurred during password update.' });
    // }

  })
});



module.exports = router;