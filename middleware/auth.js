const jwt = require("jsonwebtoken");

//Auth middleware

exports.requirelogin=(req, res, next)=>{
    try {
        if(req.headers.authorization)
        {
            const token = req.headers.authorization.split(' ')[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = decode;
            next();
        }else{
            return res.status(400).json({mesage: "unauthorized"});
        }
    } catch (error) {
     console.log("something went wrong");
    }
        
}

