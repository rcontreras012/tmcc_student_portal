var express = require('express');
const announcementModel = require('../model/announcementModel');
var router = express.Router();

const StudentModel = require('../model/studentModel')

/* GET users listing. */
router.post('/', async function (req, res, next) {



    let announcement = req.query.announcement
    let isActive = req.query.is_active
    let DateAnnounce = req.query.date_announce
    let ExpireDate = req.query.expired_date




    if (announcement == "" || announcement == undefined) {
        res.status(400)
        res.send({
            error: "Announcement is required"
        })
    }
    else if (isActive == "" || isActive == undefined) {
        res.status(400)
        res.send({
            error: "isActive is required"
        })
    }
    else if (DateAnnounce == "" || DateAnnounce == undefined) {
        res.status(400)
        res.send({
            error: "Date announce is required"
        })
    }
    else if (ExpireDate == "" || ExpireDate == undefined) {
        res.status(400)
        res.send({
            error: "Expired daate is required"
        })
    }
    else {
        const announcements = new announcementModel({
            announcement,
            isActive,
            DateAnnounce,
            ExpireDate
        })

        try {
            const dataToSave = await announcements.save();
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
