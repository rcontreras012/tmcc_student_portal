var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passwordModel = require('../model/passwordModel');
const userModel = require('../model/studentModel')
const moment = require('moment');
const nodemailer = require("nodemailer");
/* GET users listing. */
router.post('/', function (req, res, next) {


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
                                    console.log(err)
                                }
                                else {
                                    console.log("Updated Docs : ", docs);


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
                                        subject: 'TMCCC Student Portal Password',
                                        html: `Hi student  your account password for TMCC Student Portal has been changed.
                                 `
                                    };

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
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

    });



});

module.exports = router;
