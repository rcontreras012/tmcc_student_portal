var express = require('express');
const SectionModel = require('../model/sectionModel');
var router = express.Router();

/* GET users listing. */
router.post('/', async function (req, res, next) {


    let gcode = req.query.gcode
    let secCode = req.query.secCode
    let term = req.query.term
    let secName = req.query.secName


    if (gcode == "" || gcode == undefined) {
        res.status(400)
        res.send({
            error: "gcode is required",
            asdad: req.query
        })
    }
    else if (term == "" || term == undefined) {
        res.status(400)
        res.send({
            error: "Term is required"
        })
    }
    else if (secCode == "" || secCode == undefined) {
        res.status(400)
        res.send({
            error: "Section code is required",
        })
    }
    else if (secName == "" || secName == undefined) {
        res.status(400)
        res.send({
            error: "Section name is required",
        })
    }
    else {

        const section = new SectionModel({

            gcode,
            term,
            secCode,
            secName
        })

        try {
            const dataToSave = await section.save();
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
