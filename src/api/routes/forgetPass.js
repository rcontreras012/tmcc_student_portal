var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const studentModel = require('../model/studentModel');
const teacherModel = require('../model/teacherModel')
const nodemailer = require("nodemailer");
const ForgetModel = require('../model/passwordModel');
const moment = require('moment');
/* GET users listing. */
router.post('/', function (req, res, next) {


    let schoolEmail = req.query.email
    let password = req.query.password



    // Teacher
    // sample@tmcc.teacher.com
    // Admin
    // sample@tmcc.admin.com

    let isTeacher = schoolEmail.match(/tmcc.teacher.com/gi)
    let isAdmin = schoolEmail.match(/tmcc.admin.com/gi)
    let personal = schoolEmail.match(/gmail.com/gi)

    if (isTeacher != null) {

        teacherModel.find({ schoolEmail }, "", (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {
                if (user.length == 0) {
                    res.send({
                        error: "Incorrect email or password, please try again.ssss",
                        failed: true
                    })
                } else {
                    res.status(200)
                     var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var passwordLength = 6;
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
                        to: user[0].schoolEmail,
                        subject: 'TMCCC Student Portal Forget Password',
                        html: `Hi teacher  your account password for TMCC Student Portal has been reset.
                                <br>
                                <br>
                                    <br>

                                Note: Please dont share your otp code to others.
                                
                                <br>
                                OTP Code: ${password}
                                <br>

                                <br> `
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            
                        } else {
                            
                            // do something useful

                            const pass = new ForgetModel({
                                email: user[0].schoolEmail,
                                code: password,
                                date: moment().format('MMMM Do YYYY, h:mm:ss a')
                            })

                            try {
                                const dataToSave =  pass.save();
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
                }
            }

        });
    }
    else if (isAdmin != null) {
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



                    // res.send({
                    //     user,
                    //     data: req.query,
                    //     failed: false,
                    //     role: 0
                    // })
                }
            }

        });
    }
    else {
        // find all athletes who play tennis, selecting the 'name' and 'age' fields
        studentModel.find({ email: schoolEmail }, "", (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {
                if (user.length == 0) {
                    res.send({
                        error: "Incorrect email or password, please try again.asdasda",
                        student: true,
                        failed: true
                    })
                } else {
                    res.status(200)
                    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var passwordLength = 6;
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
                        to: schoolEmail,
                        subject: 'TMCCC Student Portal Forget Password',
                        html: `Hi student  your account password for TMCC Student Portal has been reset.
                                <br>
                                <br>
                                    <br>

                                Note: Please dont share your otp code to others.
                                
                                <br>
                                OTP Code: ${password}
                                <br>

                                <br> `
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            
                        } else {
                            
                            // do something useful

                            const pass = new ForgetModel({
                                email: schoolEmail,
                                code: password,
                                date: moment().format('MMMM Do YYYY, h:mm:ss a')
                            })

                            try {
                                const dataToSave =  pass.save();
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
                  
                }
            }

        });
    }


});

module.exports = router;
