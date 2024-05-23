var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();


const loginController = require('../controller/login');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/getData', function (req, res, next) {
  loginController.getData().then(result => {
    // res.json({data: result});
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

//getting data by id 
router.get('/getData/:id', function (req, res, next) {
  loginController.getDataa(req.params.id).then(result => {
    // res.json({data: result});
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


router.post('/postData', function (req, res, next) {
  //  console.log(req.body.user)
  let userID = req.body.userID;
  let password = req.body.password;
  console.log(userID);
  console.log(password);
  if (!userID || !password) {
    res.json({ success: false, data: "Blank" });
  } else {
    loginController.loginpost(userID, password).then(result => {

      if (result.rowsAffected > 0 || !result.rowsAffected) {

        const jwttoken = jwt.sign(
          {
            userID: userID,
            isLogin: true
          },
          "Lms_key",
          {
            expiresIn: '1h'
          }
        );

        res.json({
          token: jwttoken,
          data: result.recordsets,
          status: '200',
          msg: 'Data getted Successfully'
        });
      } else {
        res.json({
          token: "Incorrect UserId or Password",
          data: null,
          status: '201',
          msg: 'Wrong UserID or Password'
        });
      }
    })
  }

});






module.exports = router;
