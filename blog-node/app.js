const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Blog=require('./models/blogs');
const url='mongodb://127.0.0.1:27017/testdb';
mongoose.connect(url).then((result)=>
    app.listen(3000,()=>{
        console.log('listening on port 3000');
    })).catch((err)=>{
    console.log('connection error')
});



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
const blogs=[
]
app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/create',(req,res)=>{
    res.render('create');
});
app.get('/',(req,res)=>{
    Blog.find().then((result) => {
        res.render('index',{blogs:result});
      }).catch((err) => {
        console.log(err);
      });

});
app.post('/create',(req,res)=>{
    const blog=new Blog(req.body);
    blog.save().then((result)=>{
        res.redirect('/');

    }).catch((error)=>{
        console.log(error);
    })

})

app.get('/:id', async (req, res) => {
    const id =req.params.id;
    console.log(id);
Blog.find({_id:id}).then((result)=>{
    res.render('detail',{blogs:result});

  }).catch((err)=>{
    console.log(err);
  });
})




app.get('/addblog',(req,res)=>{
    const blog=new Blog({
        title:'second blog',
        snippet:'weather',
        body:'the weather is boring'
    })
    blog.save().then((result)=>{
        res.send(result);
    }).catch((error)=>{
        console.log(error);
    })
})

app.get('/singleblog',(req,res)=>{
    Blog.findById('66969b5476aa2e8cf29303da').then((result)=>{
        res.send(result);
    }).catch((error)=>{
        console.log(error);
    })
})

app.use((req,res)=>{
    res.render('404');
})


