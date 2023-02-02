var express = require('express');
const studentRecordModel = require('../model/studentRecordModel');
const StudentRecord = require('../model/studentRecordModel');
var router = express.Router();

/* GET users listing. */
router.post('/', async function (req, res, next) {

    
    let file = req.query.file



    await file.map((i, index) => {
        const schedule = new studentRecordModel({

            studentID: i.studentID,
            secCode: i.secCode,
            gradeCode: i.gradeCode,
            name: i.name,
            schoolYear: i.schoolYear,
            LRNNumber: i.LRNNumber,
            
        })

        try {
            const dataToSave =  schedule.save();
       
        }
        catch (error) {
            res.status(400).json({ message: error.message })
            res.send({
                error: "something went wrong"
            })
        }

    })

    res.send({
        msg: "success"
    })



   

    


});

module.exports = router;
