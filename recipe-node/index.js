const express=require('express');
const mongoose=require('mongoose');
const authroutes=require('./routes/authroutes');
const cookieParser = require('cookie-parser');
const verifyToken=require('./middleware/verify')



const app=express()

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())


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
app.get('/smoothies',verifyToken,(req,res)=>{
    res.render('smoothies');
})
app.get('/set-cookies',(req,res)=>{
    res.cookie('username','samuel')
    res.send('cookie set');

})
app.get('/get-cookies',(req,res)=>{
    const cookies=req.cookies
    res.json(cookies.username)
})
app.use(authroutes)
