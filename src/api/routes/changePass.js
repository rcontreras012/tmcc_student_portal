var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passwordModel = require('../model/passwordModel');
const userModel = require('../model/studentModel')
const teacherModel = require('../model/teacherModel')
const moment = require('moment');
const nodemailer = require("nodemailer");
/* GET users listing. */

module.exports = () => {

    router.post('/changepass', function (req, res, next) {


        let code = req.query.code
        let newPass = req.query.newpassword



        // find all athletes who play tennis, selecting the 'name' and 'age' fields
        passwordModel.find({ code }, "", (err, user) => {
            if (err) return handleError(err);
            // 'athletes' contains the list of athletes that match the criteria.
            else {
                if (user.length == 0) {
                    res.send({
                        error: "Incorrect OTP code, please try again",
                        student: true,
                        failed: true
                    })
                } else {
                    let email = user[0].email


                    let isTeacher = email.match(/tmcc.teacher.com/gi)
                    let isAdmin = email.match(/tmcc.admin.com/gi)
                    let personal = email.match(/gmail.com/gi)




                    if (isTeacher != null) {
                        teacherModel.find({ email }, "", (err, user) => {
                            if (err) return handleError(err);
                            // 'athletes' contains the list of athletes that match the criteria.
                            else {

                                let data = user[0]

                                // res.send({
                                //    user: data
                                // })

                                teacherModel.updateOne({ schoolEmail: email },
                                    { password: newPass }, function (err, docs) {
                                        if (err) {
                                            
                                        }
                                        else {
                                            


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
                                                subject: 'TMCNHS Student Portal Password',
                                                html: `Hi teacher  your account password for TMCC Student Portal has been changed.
                                 `
                                            };

                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    
                                                } else {
                                                    res.status(200)
                                                    res.send({
                                                        pasok: docs,
                                                        failed: false,
                                                        teacher: "oo",
                                                        email
                                                    })
                                                }
                                            });
                                        }
                                    });

                            }

                        });

                    } else {
                        userModel.find({ email }, "", (err, user) => {
                            if (err) return handleError(err);
                            // 'athletes' contains the list of athletes that match the criteria.
                            else {

                                let data = user[0]

                                // res.send({
                                //    user: data
                                // })

                                userModel.updateOne({ email },
                                    { password: newPass }, function (err, docs) {
                                        if (err) {
                                            
                                        }
                                        else {
                                            


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
                                                subject: 'TMCNHS Student Portal Password',
                                                html: `Hi student  your account password for TMCC Student Portal has been changed.
                                 `
                                            };

                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    
                                                } else {
                                                    res.status(200)
                                                    res.send({
                                                        pasok: docs,
                                                        failed: false
                                                    })
                                                }
                                            });
                                        }
                                    });

                            }

                        });

                    }



                }
            }

        });



    });


    router.post('/updatePassword', function (req, res, next) {


     
        let email = req.query.email
        let oldPass = req.query.oldpassword
        let newPass = req.query.newpassword
        let teacher = req.query.teacher

        console.log(teacher == "true", "--> awit")



        // find all athletes who play tennis, selecting the 'name' and 'age' fields


                    let isTeacher = email.match(/tmcc.teacher.com/gi)
                    let isAdmin = email.match(/tmcc.admin.com/gi)
                    let personal = email.match(/gmail.com/gi)




                    if (teacher == "true") {
                        console.log('dito??')
                        teacherModel.find({ email }, "", (err, user) => {
                            if (err) return handleError(err);
                            // 'athletes' contains the list of athletes that match the criteria.
                            else {

                                let data = user[0]

                                // res.send({
                                //    user: data
                                // })

                                teacherModel.updateOne({ schoolEmail: email, password: oldPass },
                                    { password: newPass }, function (err, docs) {
                                        if (err) {
                                            
                                        }
                                        else {
                                            


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
                                                subject: 'TMCNHS Student Portal Password',
                                                html: `Hi teacher  your account password for TMCC Student Portal has been changed.
                                 `
                                            };

                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    
                                                } else {
                                                    res.status(200)
                                                    res.send({
                                                        pasok: docs,
                                                        failed: false,
                                                        teacher: "oo",
                                                        email
                                                    })
                                                }
                                            });
                                        }
                                    });

                            }

                        });

                    } else {
                        userModel.find({ email, password: oldPass }, "", (err, user) => {
                            if (err){
                                console.log(err)
                                return handleError(err);
                            }
                            // 'athletes' contains the list of athletes that match the criteria.
                            else {

                                let data = user[0]

                                console.log(data, "--> check this")
                                
                                // res.send({
                                //    user: data
                                // })

                                if(data != undefined){
                                    userModel.updateOne({ email, password: oldPass },
                                        { password: newPass }, function (err, docs) {
                                            if (err) {
                                                
                                            }
                                            else {
                                                


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
                                                    subject: 'TMCNHS Student Portal Password',
                                                    html: `Hi student  your account password for TMCC Student Portal has been changed.
                                 `
                                                };

                                                transporter.sendMail(mailOptions, function (error, info) {
                                                    if (error) {
                                                        
                                                    } else {
                                                        res.status(200)
                                                        res.send({
                                                            pasok: docs,
                                                            failed: false
                                                        })
                                                    }
                                                });
                                            }
                                        });
                                }
                                else{
                                    res.send({
                                        failed: true
                                    })
                                }

                            }

                        });

                    }


    



    });


    return router

}


