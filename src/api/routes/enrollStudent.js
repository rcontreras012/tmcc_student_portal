var express = require('express');
const ScheduleModel = require('../model/studentRecordModel');
var router = express.Router();

/* GET users listing. */
router.post('/', async function (req, res, next) {


    let student_id = req.query.student_id
    let term = req.query.term
    let subject = req.query.subject

  
    
    if (student_id == "" || student_id == undefined) {
        res.status(400)
        res.send({
            error: "Student id is required",
            asdad: req.query
        })
    }
    else if (term == "" || term == undefined) {
        res.status(400)
        res.send({
            error: "Term is required"
        })
    }
    else if (subject == "" || subject == undefined) {
        res.status(400)
        res.send({
            error: "Subject is required",
        })
    }
    else {

        const schedule = new ScheduleModel({
            
            student_id,
            term,
            subject
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
