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




        termModel.find({ sy }, "", async (err, d) => {

            if (err) {
                res.status(500)
                res.send({
                    msg: "Something went wrong."
                })
            }
            else {

                if (d.length == 0) {

                    term.save()

                }
                else {
                    const filter = { sy: sy };
                    const update = { sy: sy, first, second, third, fourth };

                    // `doc` is the document _before_ `update` was applied
                    let doc = await termModel.findOneAndUpdate(filter, update);


                    res.send({
                        msg: "Updated"
                    })
                }
            }
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
