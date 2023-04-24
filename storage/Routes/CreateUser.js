const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secureJwt = "MERN_Stack_Project_Series"

router.post("/loginuser",
body('email').isEmail(),
body('password','Incorrect Passsword').isLength({ min: 5 }),
async (req,res)=>{
    let email=req.body.email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let userData = await User.findOne({email})
        if(!userData){
            return res.status(400).json({ errors: "Invalid User" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

        if(!pwdCompare ){
            return res.status(400).json({ errors: "Invalid password" });
        }

        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,secureJwt)
        return res.json({ success:true,authToken:authToken });
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
});



router.post("/createuser",
body('email').isEmail(),
body('password','Incorrect Passsword').isLength({ min: 5 }),
async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt)

    try {
        await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:secPass
        });
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
});


module.exports = router;