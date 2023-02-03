var express = require('express');
const termModel = require('../model/termModel');
var router = express.Router();

/* GET users listing. */
router.post('/', async function (req, res, next) {




    let sy = req.query.sy

    try {



        termModel.find({ sy }, "", async (err, d) => {

            if (err) {
                res.status(500)
                res.send({
                    msg: "Something went wrong.",
                    err
                })
            }
            else {

                res.send({
                    data: d[0],
                    sy
                })
            }
        })




    }
    catch (error) {
        res.status(400).json({ message: error.message })
        res.send({
            error: "something went wrong",
            awit:error
        })
    }








});

module.exports = router;
