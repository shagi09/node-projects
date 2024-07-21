const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    console.log('request made');
    console.log(req.url);
    let path='./views/';
    if(req.url=='/home'){
        path+='home.html';
    }
    else if(req.url=='/contact'){
        path+='contact.html';
    }
    res.setHeader('Content-Type','text/html');
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    })


});
server.listen(3000,'localhost',()=>{
    console.log('server listening to port 3000');
})
