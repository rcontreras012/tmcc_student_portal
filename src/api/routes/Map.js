var express = require('express');
var router = express.Router();
const MapModel = require('../model/mapModel')
/* GET users listing. */


// module.exports = router;


module.exports = () => {

   
    router.post('/saveMap', function (req, res, next) {


        let gcode = req.query.gcode
        let image = req.query.image
        let secCode = req.query.seccode
        let name = req.query.name


     
        
        
        const newmap = new MapModel({
            gcode,
            image,
            secCode,
            name
        })



        try {
            const dataToSave =  newmap.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
            res.send({
                error: "something went wrong"
            })
        }


    });

  



    return router

}
