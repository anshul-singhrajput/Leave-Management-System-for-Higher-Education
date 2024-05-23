var express = require('express');
var router = express.Router();
const teacherController = require('../controller/teachercon');

router.get('/getTData/:rmn/:UserTypeCode', function (req, res, next) { //get
  teacherController.getTData(req.params.rmn, req.params.UserTypeCode).then(result => {
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

router.get('/getPData/:rmn/:UserTypeCode', function (req, res, next) { //get
  teacherController.getPData(req.params.rmn, req.params.UserTypeCode).then(result => {
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


router.get('/getPdf/:LId', function (req, res, next) {
  console.log(req.params.LId)
  // res.send("geted")
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



module.exports = router;
