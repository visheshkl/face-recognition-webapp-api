const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const database ={
    users:[
        {
            id:'123',
            name:'John',
            password:'cookies',
            email:'john@gmail.com',
            entries:0,
            joined:new Date()
        },
        {
            id:'124',
            name:'Sally',
            password:'bananas', 
            entries:0,
            joined:new Date()
        }
    ],
}
app.get('/',(req,res)=>{
    res.json(database.users);
})

app.post('/signin',(req,res)=>{
    if(req.body.email===database.users[0].email && req.body.password === database.users[0].password){
        res.json('Success');
    }else{
        res.status(400).json('Error Logging In');
    }
})

app.post('/register',(req,res)=>{
    const {email,name,password}=req.body
    database.users.push({
        id:'125',
        name:name,
        email:email,
        entries:0,
        joined:new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    let found=false;
    database.users.forEach(user=>{
        if(user.id===id){
            found=true;
            return res.json(user);
        }
    })
    if(found===false)
    {
        res.status(400).json('No Such User');
    }
})

app.put('/image',(req,res)=>{
    const {id}=req.body;
    let found=false;
    database.users.forEach(user=>{
        if(user.id===id){
            found=true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if(found===false)
    {
        res.status(400).json('Not Found');
    }
})


app.listen(3001,()=>{
    console.log('app is running on port 3001');
})