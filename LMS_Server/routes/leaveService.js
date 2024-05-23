const express = require('express');
const path = require('path');
var router = express.Router();
const applyLeaveController = require('../controller/applyleavecon');

const multer = require('multer'); //for Save Document
const fs = require('fs'); //for File Rename

var applyLeavePath = "documents/applyLeave";
// var applyLeave = multer({ dest: applyLeavePath })
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, applyLeavePath);
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let applyLeave = multer({ storage: storage });

router.get('/getData', (req, res) => {
  res.json({
    'statuscode': 200,
    'statusmessage': "Success"
  })
})

router.post('/postData', (req, res) => {
  console.log(req.body);
  res.status(200).send({ "message": "data received" });
})

//Get Leave Type Mapping
router.get('/getleavemapping/:leaveid/:genderId', function (req, res, next) { //get
  applyLeaveController.getLeaveMapping(req.params.leaveid, req.params.genderId).then(result => {
    //   res.json({data: result});
    if (result.rowsAffected > 0) {
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

//Apply Leave fill Data
router.get('/filldataal/:LeaveId/:userID', function (req, res, next) { //get
  // console.log(req.params.userID)
  applyLeaveController.filldata(req.params.LeaveId, req.params.userID).then(result => {
    //   res.json({data: result});
    if (result.rowsAffected) {
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

// get MaxLeave
router.get('/getmaxleaveal/:leaveid/:UserID', function (req, res, next) { //get
  applyLeaveController.getMaxLeave(req.params.leaveid, req.params.UserID).then(result => {
    //   res.json({data: result});
    if (result.rowsAffected) {
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

//Validate Leave Day
router.get('/validateholidayal/:lid/:fromdate/:todate/:isdisable', function (req, res, next) { //get
  // console.log(req.params.lid,req.params.fromdate,req.params.todate,req.params.isdisable)
  applyLeaveController.validateholiday(req.params.lid, req.params.fromdate, req.params.todate, req.params.isdisable).then(result => {
    //   res.json({data: result});
    if (result.rowsAffected) {
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

// Save Leave
router.post('/saveleave', applyLeave.single('UploadAppPath'), function (req, res, next) { //saveleave Method

  console.log(req.body);
  let filename = "";
  let tempPath = "";
  let targetPath = "";

  if (req.file) {
    // const ext = path.extname(req.file.originalname).toLowerCase();
    tempPath = req.file.path;
    filename = `${req.file.filename}`;
    targetPath = path.join(__dirname, `./${applyLeavePath}/${filename}`);
  }

  fs.rename(tempPath, targetPath, (err) => {

    let aplleave = { ...req.body }
    aplleave['UploadAppPath'] = filename;

    console.log(aplleave)
    applyLeaveController.saveLeave(aplleave).then(result => {
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
});

router.get('/getleaves/:userID', function (req, res, next) { //get
  // console.log(req.params.userID)
  applyLeaveController.getleaves(req.params.userID).then(result => {
    // res.json({data: result});
    if (result.rowsAffected > 0) {
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

// Get Application for extend leave
router.get('/getleaveforextend/:applicationid', function (req, res, next) { //get
  console.log(req.params.applicationid)
  applyLeaveController.GetLeaveForExtend(req.params.applicationid).then(result => {
    // res.json({data: result});
    if (result.rowsAffected) {
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

// Save Extend Leave
router.post('/saveextendleave', applyLeave.single('UploadAppPath'), function (req, res, next) { //saveleave Method

  // console.log(req.body);
  let filename = "";
  let tempPath = "";
  let targetPath = "";

  if (req.file) {
    // const ext = path.extname(req.file.originalname).toLowerCase();
    tempPath = req.file.path;
    filename = `${req.file.filename}`;
    targetPath = path.join(__dirname, `./${applyLeavePath}/${filename}`);
  }

  fs.rename(tempPath, targetPath, (err) => {

    let aplleave = { ...req.body }
    aplleave['UploadAppPath'] = filename;

    // console.log(aplleave)
    applyLeaveController.saveextendleave(aplleave).then(result => {
      if (result) {
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
});

//get Cancel Leave 
router.get('/getleavescancel/:userID', function (req, res, next) { //get
  // console.log(req.params.userID)
  applyLeaveController.getleavescancel(req.params.userID).then(result => {
    // res.json({data: result});
    if (result.rowsAffected > 0) {
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

// Cancel Leave
router.post('/cancelleave', function (req, res, next) { //canceLeave Method
  let leavedata = { ...req.body }

  // console.log(aplleave)
  applyLeaveController.cancelleave(leavedata).then(result => {
    if (result) {
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

//get Join Leave 
router.get('/getleavesjoining/:userID', function (req, res, next) { //get
  console.log(req.params.userID)
  applyLeaveController.getleavesjoin(req.params.userID).then(result => {
    // res.json({data: result});
    // console.log(result)
    if (result.rowsAffected > 0) {
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

// Join Leave
router.post('/joinleave', function (req, res, next) { //Join Leave Method
  let leavedata = { ...req.body }
  // console.log(aplleave)
  applyLeaveController.joinleave(leavedata).then(result => {
    if (result) {
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

//get get Leave Status
router.get('/getLeaveApplicationStatus/:userID', function (req, res, next) { //get
  // console.log(req.params.userID)
  applyLeaveController.getLeaveApplicationStatus(req.params.userID).then(result => {
    // res.json({data: result});
    // console.log(result)
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

//get Leave History
router.get('/getLeaveApplicationHistory/:userID', function (req, res, next) { //get
  // console.log(req.params.userID)
  applyLeaveController.getLeaveApplicationHistoryCurrentYear(req.params.userID).then(result => {
    // res.json({data: result});
    // console.log(result)
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

//get Holiday
router.get('/getHolidayInformation/:holiday', function (req, res, next) { //get
  // console.log(req.params.holiday)
  applyLeaveController.getHolidayInformationReport(req.params.holiday).then(result => {
    // res.json({data: result});
    // console.log(result)
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

//get Leave Dashboard Data
router.get('/getLeaveDashboard/:userID', function (req, res, next) { //get
  // console.log(req.params.userID)
  applyLeaveController.getLeaveDashboard(req.params.userID).then(result => {
    // res.json({data: result});
    // console.log(result)
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

//get approveLeave Data
router.get('/getLeavesApprove/:userID', function (req, res, next) { //get
  // console.log(req.params.userID)
  applyLeaveController.getLeavesApprove(req.params.userID).then(result => {
    // res.json({data: result});
    // console.log(result)
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

router.post('/updateleavestatus', function (req, res, next) { //Join Leave Method
  let leavedata = { ...req.body }
  // console.log(aplleave)
  console.log(leavedata);
  applyLeaveController.updateleavestatus(leavedata).then(result => {
    console.log(result);
    if (result) {
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

  //get Admin approveLeave Data
  router.get('/getAdminLeavesApprove/:userID', function (req, res, next) { //get
    console.log(req.params.userID)
    // applyLeaveController.getAdminLeavesApprove(req.params.userID).then(result => {
    //   // res.json({data: result});
    //   // console.log(result)
    //   if (result.recordsets ) {
    //     res.json({
    //       data: result.recordsets,
    //       status: '200',
    //       msg: 'Data getted Successfully'
    //     });
    //   } else {
    //     res.json({
    //       data: null,
    //       status: '201',
    //       msg: 'Data is empty'
    //     });
    //   }
    // })
  });

  // get data for pdf print
  router.get('/getPdf/:LId', function (req, res, next) {
    console.log(req.params.LId)
    res.send("geted")
    // applyLeaveController.getDataForPdf(req.params.LId).then(result => {
    //   res.json({data: result});
    //   console.log(result);
    //   if (result.recordsets) {
    //     res.json({
    //       data: result.recordsets,
    //       status: '200',
    //       msg: 'Data getted Successfully'
    //     });
    //   } else {
    //     res.json({
    //       data: null,
    //       status: '201',
    //       msg: 'Data is empty'
    //     });
    //   }
    // })
  });

});




module.exports = router;






