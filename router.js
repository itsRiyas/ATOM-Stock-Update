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
let  {collectionModel} = require('./db/schema')
//const  itemList = require('./db/schema')
let router  = express.Router()


router.get('/',(req,res)=>{
    console.log('inside root')
   console.log(req.cookies)
   // console.log(req.session)   
    console.log(req.sessionID)
  //  //console.log(session)
   if(req.session.username){  
    
    console.log('if works')  
            res.render('user-home',{ moment:moment,shop_name:req.session.shop,username:req.session.user_name})    
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
    console.log(req.session)
    //session = req.session
    //session.name = 'abc'


    
    console.log('inside user home router')
    //console.log(req.body)
    staff.findOne({
        username:username,
        password:password
    }).then((data)=>{
       console.log(data)
       if(data === null){
        res.send(500,'someting wend wrong')
       }
       else{
             //session = req.session
        req.session.username = data.user_name
        req.session.password = data.pass
        req.session.shop = data.shop_name
        console.log('inside findone')
       
       // res.render('user-home',{ moment:moment,shop_name:data.shop_name,username:username})
       res.redirect('all-collection')
       }
       
    })
        

    console.log('out')
   // console.log(session)
    
    
    
    
    
    
    
})

router.get('/user-history',(req,res)=>{
   
     console.log('history')
     
    res.render('user-history',{ moment:moment,username:req.session.username,shop_name:req.session.shop})
})


router.get('/logout-user',(req,res)=>{
   console.log('logout')
   req.session.destroy()
   
  
   res.redirect('/')
   
      
 })

router.get('/get-order-data',(req,res)=>{
    console.log('this is body')
    console.log(req.body)
   orderModel.find({userId:req.session.username},(err, result)=>{
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
    res.render('user-home',{ moment:moment,shop_name:req.session.shop,username:req.session.username})
    
})

router.get('/collection',(req,res) => {
    res.render('collection',{ moment:moment,shop_name:req.session.shop,username:req.session.username})
    
})

router.get('/all-collection',(req,res) => {
    //find all collection  by shop name or username and send it back to the client side
    console.log(req.session)
    collectionModel.find({staff:req.session.username},(err, result)=>{
        if(!err){
            console.log(result)
            res.render('all-collections',{ moment:moment,shop_name:req.session.shop,username:req.session.username,data:result})        
            
        }
   })

    
    
})

router.post('/save-collection',(req,res) => {
    let collection = new collectionModel(req.body) 
    collection.save((err,doc)=>{
        if(!err){
            res.json({msg:'colection saved successfully'})
        }
        else{
            res.json('error')
        }
    })
   
    
    
})

//from here admin starts

router.get('/admin',(req,res)=>{
    res.render('admin-login')
})

router.get('/admin-home',(req,res)=>{
    console.log('inside admin home')
    collectionModel.find((err,result)=>{
        if(!err){
            res.render('admin-home',{result})
        }    
    })
    
})
router.get('/show-stock-admin',(req,res)=>{
   
    console.log('history')
    orderModel.find({},(err,data)=>{
        if(!err){
            res.json(data)
        }
    })
   //
})

module.exports = router