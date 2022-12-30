var express = require('express');
var router = express.Router();

const StudentModel = require('../model/studentModel')

/* GET users listing. */
router.post('/', async function (req, res, next) {



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
        const student = new StudentModel({
            first_name,
            last_name,
            address,
            email,
            LRNNum,
            contact_no,
            role: 3
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



});

module.exports = router;
