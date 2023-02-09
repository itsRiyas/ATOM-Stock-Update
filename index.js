const express  =  require('express')
const router  = require('./router')
const moment     = require('moment')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app  = new express()
//let cors = require('cors')
//app.use(cors)
const mongoose = new require('mongoose')
app.set(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.set('view engine', 'ejs')
app.locals.moment = moment
const fiveDay = 1000 * 60 * 60 * 24 * 5
const PORT = process.env.PORT || 3030



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
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: fiveDay },
    resave: false 
}));

app.use((req,res,next)=>{
	
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next()
 })

app.use(express.urlencoded({ extended: true }));//body parsing on form.submit
app.use(express.json())
app.use(cookieParser())
app.use('/',router)



app.listen(PORT,'0.0.0.0',(req)=>{
    console.log('server RUNNING @ 1000')
	//console.log(req.session)
})

//console.log(moment)