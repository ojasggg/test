const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/registrationSchema");
const auth = require("../middleware/auth");
const upload = require("../middleware/fileupload");

const router = new express.Router();
router.post('/user/register', function(req,res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const gender = req.body.gender;
    const email = req.body.email;
    const age = req.body.age;
    const userType = req.body.userType ;
    const password = req.body.password ;

    bcrypt.hash(password ,10,function(err , hash){
        console.log(hash)
        const data = new Users({firstname: firstname ,lastname : lastname, username : username ,gender : gender,age : age, email : email ,userType : userType, password : hash})

        data.save()
        .then(function(){
            res.status(201).json({message : "Regisered Successfully!!!"})
        })

        .catch(function(){
            res.status(500).json({message : "Error occured."})
        })

    })
})




// Login System 
router.post('/user/login',function(req,res){
    const username = req.body.username ; 
    const password = req.body.password ;
    

    Users.findOne({userName : username}) 
    .then(function(userData){
        if(userData == null){
            return res.status(400).json({message : "Invalid Login credentials!!"})
        }
        bcrypt.compare(password , userData.password,function(err, result){
            if(result==false){
.
                return res.status(400).json({message : "Invalid Login credentials!!"}) 
            }
        
            const token = jwt.sign({id : userData._id },"Ojash") 
            res.status(200).json({token : token , message : "Login Sucessful!!"})

        })      
        
    })
    .catch()

})

router.put('/user/update',function(req,res){
    const id = req.body.id;
    const profilePic = req.body.profilePic ;
    Users.updateOne({_id : id},{userProfile : profilePic })
    .then(function(){
        res.status(201).json({message : "Updated Successfully!!!"})
    })

    .catch(function(){
        res.status(500).json({message : "Error occured."})
    })  

})

router.post('/profile/upload', upload.single('myimage'),function(req,res){

    console.log(req.file)
    const fileName = req.file.filename

    if(req.file==undefined){
        res.status(400).json({message : "Only png images are allowed."})
    }

    const data = new Users({
        userProfile : fileName
    })

    data.save()
    .then(function(){
        res.status(201).json({message : "Profile pic Inserted."})
    })

    .catch(function(){
        res.status(500).json({message : "Error occured."})
    })

})


module.exports = router ; 