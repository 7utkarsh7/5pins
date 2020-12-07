const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const{requireLogin}= require('../middleware/auth')
//register user
router.post("/register", async (req,res)=>{
    const { email, password}= req.body;
    try{
   let user = await User.findOne({email});
   if(user){
       return res.status(400).json({error: "user already exists"});
   }
   const hashed_password = await bcrypt.hash(password, 10)
   user = new User ({
       email,
        password: hashed_password,
         list
   })
   await user.save();
   res.status(201).json({message: "user created successfully"});
    }catch(err){
      console.log(err);
        }
});
//login user

router.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "invalid credintials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error: "invalid Credentials"})
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h",
    });
    return res.josn(token);
    } catch (error) {
     console.log(err.message);
    }
});

router.get("/", requireLogin, async (req,res)=>{
    console.log(req.user);
    try {
        const user =User.findById(req.user).select(".passowrd");
        res.json(user);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;