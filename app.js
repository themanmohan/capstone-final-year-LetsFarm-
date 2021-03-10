const express = require("express")
const dbconnection = require("./Config/dbConnection")
const AllIndiaRoute = require("./route/AllIndia")
const AuthRoute=require("./route/User")
const ExpertRoute = require("./route/experts/experts")
const ReviewsRoute = require("./route/experts/reviews")
const methodOverride = require("method-override")
const ejs = require("ejs")
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
//env
require('dotenv').config()
require('./Config/passport')(passport);
var app = express()

//database connection
dbconnection()

//serving static file
app.use(express.static(__dirname + "/public"))

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
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.currentUser=req.user
    next();
});



//settting view engine ejs
app.set("view engine", "ejs")

app.use('/AllIndia', AllIndiaRoute)
app.use('/users', AuthRoute) 
app.use('/experts', ExpertRoute) 
app.use('/experts/:expert_id/reviews', ReviewsRoute)





const PORT = process.env.PORT || 6000
app.listen(PORT, (err, data) => {
    console.log("running at 5000")
})