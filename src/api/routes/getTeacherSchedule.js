var express = require('express');
var router = express.Router();
const studentRecordModel = require('../model/studentRecordModel')
const scheduleModel = require('../model/ScheduleModel');
const gradingModel = require('../model/gradeModel');
const gradeModel = require('../model/gradeModel');
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

    router.post('/getteacherschedule', function (req, res, next) {


        let sy = req.query.sy
        let teacher_id = req.query.teacher_id

        scheduleModel.find({ sy, teacher_id }, "", (err, list) => {
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


    router.post('/getSubject', function (req, res, next) {


        let gcode = req.query.gcode
        let secCode = req.query.seccode
        let sy = req.query.sy
        let teacher_id = req.query.teacher_id

        scheduleModel.find({ sy, teacher_id }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        }).select('subject')




    });


    router.post('/gradeStudent', async function (req, res, next) {


        let gcode = req.query.gcode
        let secCode = req.query.seccode
        let sy = req.query.sy
        let LRNNumber = req.query.studentID
        let subject = req.query.subject
        let gradeVal = req.query.grade
        let selectedPeriod = req.query.selectedPeriod
        let first = req.query.first
        let second = req.query.second
        let third = req.query.third
        let fourth = req.query.fourth
        

     


        // gradeModel.updateOne({
        //     gcode,
        //     secCode
        // })

        gradeModel.find({ gcode, secCode, LRNNumber, sy, subject }, '',  (err, grade) => {

            if (err) return handleError(err)
            else {
              

                if(grade.length == 0){

                    const gradeSave = new gradeModel({
                        sy,
                        gcode,
                        secCode,
                        LRNNumber,
                        first: gradeVal,
                        second: '',
                        third: '',
                        fourth :'',
                        subject: '',
                        subject,
                        studentID: LRNNumber
                    })

                    try {
                        const dataToSave =  gradeSave.save();
                        res.status(200).json(dataToSave)
                    }
                    catch (error) {
                        res.status(400).json({ message: error.message })
                        res.send({
                            error: "something went wrong"
                        })
                    }

                }

                else{
                 


                    if(selectedPeriod == 1){
                        gradeModel.updateOne({
                            sy,
                            gcode,
                            studentID: LRNNumber,
                            subject
                        }, {
                            first: gradeVal,
                            subject: subject
                        }, function (err, docs){
                            console.log("updated grade")
                            res.send({
                                msg: "Success update",
                                docs,
                                subject
                            })
                        })
                    }
                    else if (selectedPeriod == 2) {
                        gradeModel.updateOne({
                            sy,
                            gcode,
                            studentID,

                        }, {
                            second: gradeVal,
                            subject: subject
                        }, function (err, docs) {
                            console.log("updated grade")
                            res.send({
                                msg: "Success update",
                                docs,
                                gradeVal
                            })
                        })
                    }

                    else if (selectedPeriod == 3) {
                        gradeModel.updateOne({
                            sy,
                            gcode,
                            studentID,
                            subject

                        }, {
                            third: gradeVal,
                            subject: subject
                        }, function (err, docs) {
                            console.log("updated grade")
                            res.send({
                                msg: "Success update",
                                docs,
                                gradeVal
                            })
                        })
                    }
                    else if (selectedPeriod == 4) {
                        gradeModel.updateOne({
                            sy,
                            gcode,
                            studentID,
                            subject

                        }, {
                            fourth: gradeVal,
                            subject: subject
                        }, function (err, docs) {
                            console.log("updated grade")
                            res.send({
                                msg: "Success update",
                                docs,
                                gradeVal
                            })
                        })
                    }
                }
            }
        })


    




    });



    
    return router
    
}
