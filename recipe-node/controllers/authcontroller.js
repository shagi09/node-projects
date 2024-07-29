const User = require("../models/user");
const error={
    'email':'',
    'password':''
}

module.exports.SignUp_Get=(req,res)=>{
    res.render('signup');

}
module.exports.SignUp_Post=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user=await User.create({email,password})
        res.json(user);

    }
    catch(err){
        console.log(err.code)
        if(err.code==11000){
            res.send('email already registered')
        }
        if(err.message.includes('user validation failed')){
            Object.values(err.errors).forEach(({properties})=>{
                error[properties.path]=properties.message
            })
            res.send(error)

        }



    }




}
module.exports.LogIn_Get=(req,res)=>{
    res.render('login');

}
module.exports.LogIn_Post=(req,res)=>{
    res.send('new login')

}