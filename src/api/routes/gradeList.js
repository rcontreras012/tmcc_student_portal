var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const scheuleModel = require('../model/ScheduleModel')
const studentModel = require('../model/studentRecordModel');
/* GET users listing. */
router.post('/', function (req, res, next) {


    let gcode = req.query.gcode
    let secCode = req.query.seccode
    let SchoolYear = req.query.sy

    



        studentModel.find({ gcode, secCode, SchoolYear }, "", (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {

                console.log(user)

                res.send({
                    user,
                    gcode,
                    secCode,
                    SchoolYear
                })
               
                // Get all student info under this grade
            }

        });
    
 


});

module.exports = router;
