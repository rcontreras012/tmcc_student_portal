var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const gradeModel = require('../model/gradeModel');
const ScheduleModel = require('../model/ScheduleModel');
const StudentModel = require('../model/studentModel');
const studentRecordModel = require('../model/studentRecordModel');


require('dotenv').config();
/* GET users listing. */
module.exports = () => {

    router.post('/addstudent', async function (req, res, next) {



    let first_name = req.query.first_name
    let last_name = req.query.last_name
    let address = req.query.address
    let email = req.query.email
    let contact_no = req.query.contact_no
    let LRNNum = req.query.lrnnumbers



    if (first_name == "" || first_name == undefined) {
        res.status(400)
        res.send({
            error: "First name is required"
        })
    }
    else if (last_name == "" || last_name == undefined) {
        res.status(400)
        res.send({
            error: "Last name is required"
        })
    }
    else if (address == "" || address == undefined) {
        res.status(400)
        res.send({
            error: "Address is required"
        })
    }
    else if (email == "" || email == undefined) {
        res.status(400)
        res.send({
            error: "Email is required"
        })
    }
    else if (contact_no == "" || contact_no == undefined) {
        res.status(400)
        res.send({
            error: "Contact number is required"
        })
    }
    else if (LRNNum == "" || LRNNum == undefined) {
        res.status(400)
        res.send({
            error: "LRN is required"
        })
    }
    else {
        // iktochduruvxxfui


        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 12;
        var password = "";

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: 'tmcc@example.com',
            to: email,
            subject: 'TMCCC Student Portal Account Creation',
            html: `Hi student <b>${first_name} ${last_name}</b> your account for TMCC Student Portal has been created.

            <br>
              <br>
                <br>

            Credentials: 
            
            <br>
             Email: ${first_name + "." + last_name + "@tmcc.student.com"}
            <br>
             Password: ${password}

             <br>

         
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                // do something useful
            }
        });


        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        var id = ''

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            id += chars.substring(randomNumber, randomNumber + 1);
        }


        const student = new StudentModel({
            first_name,
            last_name,
            address,
            email,
            LRNNum,
            contact_no,
            role: 3,
            password,
            schoolEmail: first_name + "." + last_name + "@tmcc.student.com",
            id: day + "-" + month + "-" + year + "-"+ id
        })

        try {
            const dataToSave = await student.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
            res.send({
                error: "something went wrong"
            })
        }

    }





})

    router.post('/getstudentrecord', function (req, res, next) {


       
        let schoolYear = req.query.sy.toString()
        let LRNNumber = req.query.LRNNum.toString()

        studentRecordModel.find({ LRNNumber, schoolYear }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {

                console.log(list, "--> check")

                res.send({
                    user: list.length == 0 ? [] : list[0],
                    params: req.query
                })

                // Get all student info under this grade
            }

        })




    });

    router.post('/getstudentschedule', function (req, res, next) {



        let sy = req.query.sy
        let gcode = req.query.gcode
        let secCode = req.query.seccode

        ScheduleModel.find({ gcode, secCode, sy }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    sched: list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        })




    });

    router.post('/getstudentgrade', function (req, res, next) {



        let sy = req.query.sy
        let gcode = req.query.gcode
        let secCode = req.query.seccode
        let LRNNumber = req.query.LRNNumber

        gradeModel.find({ gcode, secCode, sy, LRNNumber }, "", (err, list) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {



                res.send({
                    grade: list,
                    params: req.query
                })

                // Get all student info under this grade
            }

        })




    });

    return router
}

