const express = require('express')
//const { Model } = require('mongoose')
const moment = require('moment')

const mongoose = require('mongoose');
//mongoose.pluralize(null);
//var Schema = mongoose.Schema
//const Orders = require('./db/schema')
//var { Order } = require('./db/schema')
let  {itemList}  = require('./db/schema')
let  {orderModel}  = require('./db/schema')
let  {staff} = require('./db/schema')
//const  itemList = require('./db/schema')
let router  = express.Router()

var session ={};
session.username = null;

router.get('/',(req,res)=>{
    console.log('inside root')
    console.log(session)
    
    
    console.log(session)
   if(session.username){  
    
    console.log('if works')  
            res.render('user-home',{ moment:moment,shop_name:session.shop})    
   }
    
    else
        res.render('customer-login')
    //console.log(req.session)
    //console.log()
    
    
})

router.get('/get-products-for-listing', (req,res)=>{
   
   itemList.find({},(err,result)=>{
    //console.log(result)
    if(!err)
    
        res.json(result)
    else
        console.log(err)
   })
})

router.post('/user-home',(req,res)=>{
    //user name pasasword check here
    let { username, password} = req.body
    
    //session = req.session
    //session.name = 'abc'


    
    console.log('inside user home router')
    //console.log(req.body)
    staff.findOne({
        username:username,
        password:password
    }).then((data)=>{
       console.log(data)
        //session = req.session
        session.username = data.user_name
        session.password = data.pass
        session.shop = data.shop_name
        console.log('inside findone')
        console.log(session)
        res.render('user-home',{ moment:moment,shop_name:data.shop_name,username:username})
    })
        

    console.log('out')
    console.log(session)
    
    
    
    
    
    
    
})

router.get('/user-history',(req,res)=>{
   
     console.log('history')
     
    res.render('user-history',{ moment:moment,username:session.username})
})


router.get('/logout-user',(req,res)=>{
   console.log('logout')
   session.username = null;
   console.log(session)
  
   res.redirect('/')
   
      
 })

router.get('/get-order-data',(req,res)=>{
    console.log('this is body')
    console.log(req.body)
   orderModel.find({userId:session.username},(err, result)=>{
        if(!err){
            console.log(result)
            res.json(result)
        }
   })
    console.log('getting order data')
    //res.rson('user-history')
})

router.post('/user-home-save-order',(req,res)=>{
  /*  let order = new Orders(req.body)//creating model for order
   order.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully! order");
  });
*/  
    let order = new orderModel(req.body)
    order.save(req.body,(err,result)=>{
        if(!err){
            console.log('order saved successfully')
            res.status(200).json({ message: "saved" })
        }
        else{
            console.log(err)
            res.status(200).json({message:'somethinhg went wrong'})
        }
    })

    
})

router.get('/goto-add-stock',(req,res) => {
    res.render('user-home',{ moment:moment,shop_name:session.shop,username:session.username})
    
})



module.exports = router