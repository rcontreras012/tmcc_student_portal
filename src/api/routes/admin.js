var express = require('express');
var router = express.Router();

const TeacherModel = require('../model/teacherModel')
const nodemailer = require("nodemailer");

/* GET users listing. */
router.post('/', async function (req, res, next) {



    let first_name = req.query.first_name
    let last_name = req.query.last_name
    let address = req.query.address
    let email = req.query.email
    let contact_no = req.query.contact_no
    let teacher_id_no = req.query.teachernum



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
    else if (teacher_id_no == "" || teacher_id_no == undefined) {
        res.status(400)
        res.send({
            error: "Teacher id numer is required"
        })
    }
    else {
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
            html: `Hi Teacher <b>${first_name} ${last_name}</b> your account for TMCC Student Portal has been created.

            <br>
              <br>
                <br>

            Credentials: 
            
            <br>
             Email: ${first_name + "." + last_name + "@tmcc.teacher.com"}
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


        const teacher = new TeacherModel({
            first_name,
            last_name,
            address,
            email,
            contact_no,
            teacher_id_no,
            role: 2,
            password,
            schoolEmail: first_name + "." + last_name + "@tmcc.admin.com"
        })

        try {
            const dataToSave = await teacher.save();
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
