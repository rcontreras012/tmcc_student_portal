var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const studentModel = require('../model/studentModel');

/* GET users listing. */
router.post('/', function (req, res, next) {


    let email = req.query.email
    let password = req.query.password

    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    studentModel.find({email, password }, "", (err, user) => {
        if (err) return handleError(err);
        // 'athletes' contains the list of athletes that match the criteria.
        else{
            if(user.length == 0 ){
                res.send({
                    error: "Incorrect email or password, please try again."
                })
            }else{
                res.status(200)
                res.send({
                    user,
                    data: req.query
                })
            }
        }
        
    });
});

module.exports = router;
