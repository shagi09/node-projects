const User = require("../models/user");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const error={
    'email':'',
    'password':''
}
function createToken(id){
    const secret='shalom secret';
    const options = { expiresIn: '1h' };
    return jwt.sign({id},secret,options)


}

module.exports.SignUp_Get=(req,res)=>{
    res.render('signup');

}
module.exports.SignUp_Post=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user=await User.create({email,password})
        const token=createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true})
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
module.exports.LogIn_Post = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token=createToken(user._id)
            res.cookie('login',token,{httpOnly:true,
                maxAge: 1 * 60 * 60 * 1000 
            })
             res.redirect('/')

        }
        else{
            return res.status(401).json('incorrect password')
        }
      }
      else{
        return res.status(401).json('incorrect email')
      }
  

    } catch (err) {
      console.error('Error in LogIn_Post:', err);
      return res.status(500).json({ error: 'An unexpected error occurred during login' });
    }
  };
  module.exports.LogOut_Get=(req,res)=>{
    res.cookie('login','',{maxAge:1})
    res.redirect('/')
  }