const User = require("../models/user");

module.exports.SignUp_Get=(req,res)=>{
    res.render('signup');

}
module.exports.SignUp_Post=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user=await User.create({email,password})
        res.json(user);

    }
    catch{
        res.json('err creating user');

    }




}
module.exports.LogIn_Get=(req,res)=>{
    res.render('login');

}
module.exports.LogIn_Post=(req,res)=>{
    res.send('new login')

}