const express=require('express'); 
const fs= require('fs');
const path=require('path')
const app=express(); 
const port=80; 
const bodyparser=require('body-parser')//To save req.body we need this..while using express
//Mongoose specific information
const mongoose = require('mongoose');
const res = require('express/lib/response');

mongoose.connect('mongodb://localhost:27017/contactDance').catch(()=>{
        res.status(200).send("Location...wrong")
})



//Define Mongoose Schema
const contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
});
//Convert that schema in model
const Contact=mongoose.model('Contact',contactSchema);

//Express specific Configuration
app.use('/static',express.static('static'));    
app.use(express.urlencoded())       

//Pug specific configuration
app.set('view engine', 'pug')   
app.set('views',path.join(__dirname,'views'));


//EndPoints
app.get('/',(req,res)=>{   
    res.status(200).render('home.pug');
}) 
app.get('/contact',(req,res)=>{    
    res.status(200).render('contact.pug');
}) 
app.get('/about',(req,res)=>{    
    res.status(200).render('about.pug');
}) 
app.post('/contact',(req,res)=>{    
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data is saved");     //It will promise...if we want to handle it 
    }).catch(()=>{             // asynchronously ....using .then(),.error(), since node is asyncronous
        res.status(400).send("Item not found");
    });
    //Instead of doing the way...i did below , we use this which automatically do it for us
    //We haven't used body parser here...it is a middleware...and use json...best to use
    /*
    let name=req.body.name;
    let phone=req.body.phone;
    let email=req.body.email;
    let address=req.body.address;
    let desc=req.body.desc;
    let outputTowrite=`The name of the client is ${name}, ${phone} is his phone no,${email},residing at ${address} and ${desc}`;
    fs.writeFileSync('output.txt',outputTowrite);
    */
}) 

//To start the server
app.listen(port,()=>{       
    console.log(`The application started at port ${port}`);
});


