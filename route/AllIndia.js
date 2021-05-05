var express = require('express');
var AllIndia=require("../model/AllIndia")
const {authorize,isLoggedIn}=require("../middleware/auth")
var router = express.Router();



router.get('/', async (req, res) => {
    try {
        const details = await AllIndia.find()
        res.render('index', {
            details
        })
    } catch (err) {
        console.log(err)
    }
})



module.exports=router