var express = require('express');
var router = express.Router();
const studentRecordModel = require('../model/studentRecordModel')
const scheduleModel = require('../model/ScheduleModel');
/* GET users listing. */


// module.exports = router;


module.exports = () => {

    router.post('/getteachersection', function (req, res, next) {


        let gcode = req.query.gcode
        let secCode = req.query.seccode
        let sy = req.query.sy
        let teacher_id = req.query.teacher_id

        scheduleModel.find({  sy, teacher_id }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        }).select('secCode')




    });

    router.post('/getstudentlist', function (req, res, next) {


        let gradeCode = req.query.gcode
        let secCode = req.query.seccode

        studentRecordModel.find({ secCode, gradeCode }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        })




    });


    
    return router
    
}
