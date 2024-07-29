const express=require('express');
const mongoose=require('mongoose');
const authroutes=require('./routes/authroutes');



const app=express()

app.use(express.static('public'))
app.use(express.json())

app.set('view engine','ejs')

const url='mongodb://127.0.0.1:27017/node-auth'
mongoose.connect(url).then((result)=>{
    app.listen(4000,()=>{
        console.log('app listening on port 4000')
    })

}).catch((err)=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/smoothies',(req,res)=>{
    res.render('smoothies');
})
app.use(authroutes)