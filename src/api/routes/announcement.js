var express = require('express');
const announcementModel = require('../model/announcementModel');
var router = express.Router();

const StudentModel = require('../model/studentModel')

/* GET users listing. */

module.exports = () => {

    router.post('/addAnnouncement', async function (req, res, next) {

        console.log('called?')

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



    })

    router.post('/updateAnnouncement', async function (req, res, next) {

        console.log('called?')

        let announcement = req.query.announcement
        let isActive = req.query.is_active
        let DateAnnounce = req.query.date_announce
        let ExpireDate = req.query.expired_date
            let ids = req.query.id




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
  
         
                    announcementModel.findByIdAndUpdate(ids,
                        { announcement: announcement, DateAnnounce: DateAnnounce, ExpireDate: ExpireDate }, function (err, docs) {
                            if (err) {
                                res.send({
                                    result:err
                                })
                            }
                            else {


                                res.send({
                                    result: "success"
                                })

                            }
                        });

           

        }



    })

    router.post('/removeAnnouncement', async function (req, res, next) {

        console.log('called?')

        let announcement = req.query.announcement
        let isActive = req.query.is_active
        let DateAnnounce = req.query.date_announce
        let ExpireDate = req.query.expired_date
        let ids = req.query.id





            announcementModel.findByIdAndRemove(ids,'', function (err, docs) {
                    if (err) {
                        res.send({
                            result: err,
                            ids
                        })
                    }
                    else {


                        res.send({
                            result: "success"
                        })

                    }
                });



        



    })
    return router
}





// router.post('/updateMap', (req, res, next) => {


//     let gcode = req.body.gcode
//     let image = req.body.image
//     let secCode = req.body.seccode
//     let name = req.body.name

//     mapModel.find({ secCode, gcode }, "", (err, user) => {
//         if (err) return handleError(err);
//         // 'athletes' contains the list of athletes that match the criteria.
//         else {

//             let data = user[0]
//             mapModel.updateOne({ secCode, gcode },
//                 { name: name, image: image }, function (err, docs) {
//                     if (err) {

//                     }
//                     else {


//                         res.send({
//                             result: "success"
//                         })

//                     }
//                 });

//         }

//     });

// })


// router.post('/deleteMap', (req, res, next) => {


//     let gcode = req.body.gcode
//     let image = req.body.image
//     let secCode = req.body.seccode
//     let name = req.body.name


//     mapModel.deleteOne({ secCode, gcode }, (err, user) => {
//         if (err) return handleError(err);
//         // 'athletes' contains the list of athletes that match the criteria.
//         else {

//             res.send({
//                 result: "success"
//             })

//         }

//     });

// })