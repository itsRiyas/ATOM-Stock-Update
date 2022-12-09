const express  =  require('express')
const router  = require('./router')
const app  = new express()
//let cors = require('cors')
//app.use(cors)
const mongoose = new require('mongoose')
app.set(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.set('view engine', 'ejs')




mongoose.connect('mongodb://localhost:27017/testing', {
	useNewUrlParser:true,
	useUnifiedTopology:true
},(err)=>{
	if(err){
		console.log(err)
	}
	else{
		console.log("connected")
	}
})
app.use(express.json());
app.use('/',router)
app.listen(1000,'0.0.0.0',(req)=>{
    console.log('server RUNNING @ 1000')
	console.log()
})