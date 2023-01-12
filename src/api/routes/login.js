var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const studentModel = require('../model/studentModel');
const teacherModel = require('../model/teacherModel')

/* GET users listing. */
router.post('/', function (req, res, next) {


    let schoolEmail = req.query.email
    let password = req.query.password


    console.log(req)
    // Teacher
    // sample@tmcc.teacher.com
    // Admin
    // sample@tmcc.admin.com

    let isTeacher = schoolEmail.match(/tmcc.teacher.com/gi)
    let isAdmin = schoolEmail.match(/tmcc.admin.com/gi)
    
    if(isTeacher != null){
        
        teacherModel.find({ schoolEmail, password }, "", (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {
                if (user.length == 0) {
                    res.send({
                        error: "Incorrect email or password, please try again.",
                        failed: true
                    })
                } else {
                    res.status(200)
                    res.send({
                        user,
                        data: req.query,
                        failed: false
                    })
                }
            }

        });
    }
    else if(isAdmin != null){
        res.status(200)
        res.send({
            "nice": "asdasd"
        })
    }
    else{
        // find all athletes who play tennis, selecting the 'name' and 'age' fields
        studentModel.find({ schoolEmail, password }, "", (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {
                if (user.length == 0) {
                    res.send({
                        error: "Incorrect email or password, please try again.",
                        student:true,
                        failed: true
                    })
                } else {
                    res.status(200)
                    res.send({
                        user,
                        data: req.query,
                        failed: false
                    })
                }
            }

        });
    }


});

module.exports = router;
