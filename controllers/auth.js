const User = require('../models/User')

exports.register = async(req,res,next)=>{
    try {
        const {name,email,password,role,tel} = req.body;

        const user = await User.create({
            name,email,password,role,tel
        });
        sendTokenResponse(user,200,res)
    } catch (error) {
        res.status(400).json({success:false});
        console.log(error.stack);
        
    }

}


exports.login = async(req,res,next)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({success:false,msg:"please provide email and password"});
        }
        const user = await User.findOne({email:email}).select('+password');
        if(!user){
            return res.status(400).json({success:false,msg:"No User in DB"});
        }
        const matchPassword = await user.matchPassword(password);
        if(!matchPassword){
            return res.status(400).json({success:false,msg:"invalid password"});
        }


        sendTokenResponce(user,200,res)
    } catch (error) {
        res.status(400).json({success:false,error});
    }
}

exports.logout = async(req,res,next)=>{
    res.cookie('token','none',{
        expires: new Date(Date.now()+10*1000),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        data:{}
    })
}

exports.getMe = async(req,res,next)=>{
    try {
        if(!req.user){
            return res.status(400).json({success:false})
        }
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:user});
    } catch (error) {
        res.status(400).json({success:false,error});
    }
}

const sendTokenResponse = (user,statusCode,res)=>{
    const token = user.getSignedJwtToken();
    const options = {
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    }
    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token 
    })
}