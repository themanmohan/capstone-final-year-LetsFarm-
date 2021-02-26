var express =require("express")
var dbconnection=require("./Config/dbConnection")
var AllIndia=require("./model/AllIndia")
var AllIndiaRoute=require("./route/AllIndia")
var ejs=require("ejs")
//env
require('dotenv').config()
var app=express()

//database connection
dbconnection()

//serving static file
app.use(express.static(__dirname + "/public"))

//setting view engine ejs
app.set("view engine", "ejs")

app.use('/AllIndia', AllIndiaRoute)






const PORT=process.env.PORT || 6000
app.listen(PORT,(err,data)=>{
   console.log("running at 5000")
})