const jwt = require('jsonwebtoken');
const Users = require('../models/registrationSchema');

//guard
//Main guard
module.exports.verifyUser = function(req,res,next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token , 'Ojash');
        Users.findOne({_id : data.id})
        .then(function(result){
                req.userData = result ;
                next()
        })
        .catch(function(e){
            res.status(401).json({error : e})
        })
    }
    catch(e){
        res.status(401).json({error : e})
    }

}


