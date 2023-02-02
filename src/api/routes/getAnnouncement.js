var express = require('express')
var router = express.Router();
const announcementModel = require('../model/announcementModel');
require('dotenv').config();

router.post('/', async function (req, res, next) {



    announcementModel.find().all().then(v => {

        res.send({
            result: v
        })
    })
    .catch(err => {
        res.status(500)
        res.send({
            error: "Check server"
        })
    })


})

module.exports = router;
