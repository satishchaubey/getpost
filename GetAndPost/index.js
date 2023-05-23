const fs=require('fs');


const index=fs.readFileSync('index.html');
const data=JSON.parse(fs.readFileSync('data.json'));
const post=data.posts;

const express=require('express');
const morgan=require('morgan');
const server = express();


//bodyParser
server.use(express.json())
server.use(morgan('default'))
server.use(express.static('public'));

//API Endpoit Route
//iska return type hmesa array hi hoga 
server.get('/post',(req,res)=>{
    res.json(post);
    console.log("Get type");
})

//single object lane ka rule //iske jriye hm single api ko call kra skte h C R U D
server.get('/post/:id',(req,res)=>{
//    console.log(req.params)
    const id = req.params.id;
    const posts=post.find(i=>i.id===(+id));
    res.json(posts)
})

server.post('/posts',(req,res)=>{
    console.log(req.body);
    post.push(req.body)
    res.json(req.body);
    console.log("POST type");
})

server.put('/',(req,res)=>{
    res.json({type:"PUT"});
    console.log("Put type");
})

server.patch('/',(req,res)=>{
    res.json({type:"PATCH"});
    console.log("Patch type");
})

server.delete('/',(req,res)=>{
    res.json({type:"DELETE"});
    console.log("Delete type");
})


server.listen(9000,()=>{
    console.log("Server has been started on Port Number 9000");
})