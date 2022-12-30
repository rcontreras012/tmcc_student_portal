var express = require('express');
var router = express.Router();

const TeacherModel = require('../model/teacherModel')

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
        const teacher = new TeacherModel({
            first_name,
            last_name,
            address,
            email,
            contact_no,
            teacher_id_no,
            role: 2
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
