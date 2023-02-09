const mongoose = require('mongoose')

const items =  new mongoose.Schema({
    
    name: String,
    count:Number,
    rate:Number,
    total:Number

})

const itm = new mongoose.Schema({
    name:String,
    rate:Number
})
//orders
const orderSchema =  new mongoose.Schema({
    userId: String,
    date:String,
   
    grand_total:Number,
    
    items:[items]//nested schema   

})

//staff
const staffSchema =  new mongoose.Schema({
    
    name: String,
    phone:Number,
    shop_name:String,
    daily_wage:Number,
    user_name:String,
    password:String

})

//shop
const shop =  new mongoose.Schema({
    
    location: String,
    owner_phone:Number,
    staff:String

})


//collection
const collectionSchema =  new mongoose.Schema({
    date:Date,
    shop_name: String,
    staff:String,
    cash:Number,
    gpay:Number,
    box:Number,
    salary:Number,
    expense:Number,
    total_sale:Number,
    cash_balance:Number

})

const itemListSchema =  new mongoose.Schema({ //its for listing only on li only
   items:[itm]
    
   
})

const rawSchema = new mongoose.Schema({},{strict:false})

const order = mongoose.model('order',orderSchema,'order')//order model
//const itemListModel  = mongoose.model('itemLists',itemListSchema)
const itemList = mongoose.model('itemList',itemListSchema, 'itemList')

const staff = mongoose.model('staff',staffSchema,'staff')
const collection = mongoose.model('collection',collectionSchema,'collection')
//module.exports = mongoose.model('order',orderSchema, 'order')

module.exports = {
        orderModel:order,
        itemList:itemList,
        staff:staff,
        collectionModel:collection
}


   