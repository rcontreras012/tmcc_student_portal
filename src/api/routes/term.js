var express = require('express');
const termModel = require('../model/termModel');
var router = express.Router();

/* GET users listing. */
router.post('/', async function (req, res, next) {



    let first = req.query.first
    let second = req.query.second
    let third = req.query.third
    let fourth = req.query.fourth
    let sy = req.query.sy


    const term = new termModel({

        sy,
        first,
        second,
        third,
        fourth
        

    })

    try {
        const dataToSave = term.save();

        res.send({
            message: "Open grading"
        })

    }
    catch (error) {
        res.status(400).json({ message: error.message })
        res.send({
            error: "something went wrong"
        })
    }








});

module.exports = router;
