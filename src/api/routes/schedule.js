var express = require('express');
const ScheduleModel = require('../model/ScheduleModel');
var router = express.Router();

/* GET users listing. */
router.post('/', async function (req, res, next) {

    let file = req.query.file



    await file.map((i, index) => {
       

        ScheduleModel.find({ gcode: i.Gcode, secCode: i.SecCode, subject: i.SchedSubject, teacher_id: i.T_iD }, '', (err, sched) => {
            
            if (!err) {

                if (sched.length != 0) {

                    
                    ScheduleModel.updateOne({ gcode: i.Gcode, secCode: i.SecCode, subject: i.SchedSubject, teacher_id: i.T_iD }, {
                        gcode: i.Gcode,
                        secCode: i.SecCode,
                        subject: i.SchedSubject,
                        teacher: i.SchedTeacher,
                        time: i.SchedTime,
                        order: i.SchedOrder,
                        teacher_id: i.T_iD,
                        sy: i.sy
                    }, function (error, docs) {

                        if (!error) {
                            res.status(200)

                        }
                    })
                }
                else {
                    const schedule = new ScheduleModel({
                        gcode: i.Gcode,
                        secCode: i.SecCode,
                        subject: i.SchedSubject,
                        teacher: i.SchedTeacher,
                        time: i.SchedTime,
                        order: i.SchedOrder,
                        teacher_id: i.T_iD,
                        sy: i.sy
                    })
                    
                    try {
                        
                        const dataToSave = schedule.save();
                        res.status(200).json(dataToSave)
                    }
                    catch (error) {
                        // res.status(400).json({ message: error.message })
                        // res.send({
                        //     error: "something went wrong"
                        // })
                    }
                }
            }
            else {
               
            }

        })



    })

    res.send({
        msg: "success"
    })



});

module.exports = router;
