var express = require('express');
const ScheduleModel = require('../model/ScheduleModel');
var router = express.Router();

/* GET users listing. */
router.post('/',async function  (req, res, next) {
  

    let gcode = req.query.gcode
    let secCode = req.query.secCode
    let subject = req.query.subject
    let teacher = req.query.teacher
    let time = req.query.time
    let order = req.query.order


    if (gcode == "" || gcode == undefined) {
        res.status(400)
        res.send({
            error: "Grade code is required"
        })
    }
    else if (secCode == "" || secCode == undefined) {
        res.status(400)
        res.send({
            error: "Secction code is required"
        })
    }
    else if (subject == "" || subject == undefined) {
        res.status(400)
        res.send({
            error: "Subject is required"
        })
    }
    else if (teacher == "" || teacher == undefined) {
        res.status(400)
        res.send({
            error: "Teacher is required"
        })
    }
    else if (time == "" || time == undefined) {
        res.status(400)
        res.send({
            error: "Time is required"
        })
    }
    else {

        const schedule = new ScheduleModel({
            gcode,
            secCode,
            subject,
            teacher,
            time,
            order
        })

        try {
            const dataToSave = await schedule.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
            res.send({
                error: "something went wrong"
            })
        }

    }


});

module.exports = router;
