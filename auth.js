const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({...req.body,password:hashed});
        const saved = await newUser.save();
        res.status(201).json(saved);
    }catch(err){res.status(500).json(err);}
});

// Login
router.post('/login', async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(404).json("User not found");
        const valid = await bcrypt.compare(req.body.password,user.password);
        if(!valid) return res.status(400).json("Wrong password");
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).json({user,token});
    }catch(err){res.status(500).json(err);}
});

module.exports = router;
