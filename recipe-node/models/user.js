const mongoose=require('mongoose');
const isEmail=require('express-validator')
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter an email'],
        unique:true,
        validate: {
            validator: function(v) {
              return isEmail;
            },
            message: props => `${props.value} is not a valid email address`
          }


    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[6,'password must be 6 characters long'],
        validate: {
            validator: function(v) {
              // Add your password validation logic here
              return v.length >= 6;
            },
            message: props => `${props.value} is not a valid password`
          }
        }
    
})
const User=mongoose.model('user',UserSchema)
module.exports=User