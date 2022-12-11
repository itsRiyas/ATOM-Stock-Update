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
//const  itemList = require('./db/schema')
let router  = express.Router()


router.get('/',(req,res)=>{
    res.render('customer-login')
    console.log(req.ip)
})

router.get('/get-products-for-listing', (req,res)=>{
   
   itemList.find({},(err,result)=>{
    console.log(result)
    if(!err)
    
        res.json(result)
    else
        console.log(err)
   })
})

router.post('/user-home',(req,res)=>{
   
    
    res.render('user-home',{ moment:moment})
})

router.get('/user-history',(req,res)=>{
   
   console.log(moment)
    res.render('user-history',{ moment:moment})
})


router.get('/get-order-data',(req,res)=>{
   orderModel.find({},(err, result)=>{
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
module.exports = router