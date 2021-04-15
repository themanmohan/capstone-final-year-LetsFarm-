const express = require("express")
const dbconnection = require("./Config/dbConnection")
//route
const AllIndiaRoute = require("./route/AllIndia")
const AuthRoute=require("./route/User/User")
const ExpertRoute = require("./route/experts/experts")
const ReviewsRoute = require("./route/experts/reviews")
const QustionRoute = require("./route/experts/qustion")
const AnswerRoute = require("./route/experts/answer")
const weatherRoute = require("./route/weather/weather")
const NewsRoute = require("./route/news/news")
const SoildetailRoute = require("./route/soilreport/detail")
const SoilReportRoute = require("./route/soilreport/report")
const MSPRoute = require("./route/MSP/Allindia")
const methodOverride = require("method-override")
const User=require("./model/User/User")
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require("ejs")
//env
require('dotenv').config()
require('./Config/passport')(passport);
var app = express()

//database connection
dbconnection()

//serving static file
app.use(express.static(__dirname + "/public"))

app.use('/static', express.static('public'));
// Express body parser
app.use(express.urlencoded({
    extended: true
}));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(methodOverride("_method"))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Connect flash
app.use(flash());


// Global variables
app.use( function (req, res, next) {
    res.locals.currentUser = req.user;
   
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
  
    next();
});




//settting view engine ejs
app.set("view engine", "ejs")



app.use('/biharcropdetail', require("./route/cropDetail/Bihar"))
app.use('/andhrapardeshcropdetail', require("./route/cropDetail/AndhraPardesh"))
app.use('/karnatakacropdetail', require("./route/cropDetail/Karnataka"))
app.use('/maydhyapardeshcropdetail', require("./route/cropDetail/MaydhyaPardesh"))
app.use('/gujaratcropdetail', require("./route/cropDetail/Gujarat"))
app.use('/assamcropdetail', require("./route/cropDetail/Assam"))
app.use('/punjabcropdetail', require("./route/cropDetail/Punjab"))
app.use('/upcropdetail', require("./route/cropDetail/UP"))
app.use('/haryanacropdetail', require("./route/cropDetail/Haryana"))
app.use('/westbengalcropdetail', require("./route/cropDetail/WestBengal"))
app.use('/AllIndia', AllIndiaRoute)
app.use('/users', AuthRoute) 
app.use('/news', NewsRoute)
app.use('/msp', MSPRoute)
app.use('/weather', weatherRoute)
app.use('/experts', ExpertRoute)
app.use('/soildetails', SoildetailRoute)
app.use('/soildetails/:detail_id/report', SoilReportRoute)
app.use('/experts/:expert_id/reviews', ReviewsRoute)
app.use('/experts/:expert_id/qustion', QustionRoute)
app.use('/experts/:expert_id/qustion/:qustion_id/answer', AnswerRoute)




const PORT = process.env.PORT || 6000
app.listen(PORT, (err, data) => {
    console.log("running at 5000")
})