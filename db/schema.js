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
    staff: String,
    date:String,
    shop:String,
    grand_total:Number,
    
    items:[items]//nested schema   

})

//staff
const staff =  new mongoose.Schema({
    
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


const itemListSchema =  new mongoose.Schema({ //its for listing only on li only
   items:[itm]
    
   
})

const rawSchema = new mongoose.Schema({},{strict:false})

const order = mongoose.model('order',orderSchema,'order')//order model
//const itemListModel  = mongoose.model('itemLists',itemListSchema)
const itemList = mongoose.model('itemList',itemListSchema, 'itemList')

//module.exports = mongoose.model('order',orderSchema, 'order')

module.exports = {
        orderModel:order,
        itemList:itemList
}


   