var express = require('express');
var AllIndia=require("../model/AllIndia")
const {authorize,isLoggedIn}=require("../middleware/auth")
var router = express.Router();


router.get('/', (req, res) => {
   res.render('index')
})

router.get("/add",isLoggedIn, async (req, res) => {
    const data = [{
            Wheat: 2323432434
        },
        {
            SugarCane: 73647627
        },
        {
            MilkBuffalo: 324342342
        },
        {
            MilkCow: 3442423432
        }
    ]
    try {
        const data1 = await AllIndia.create(data)

        res.render("index.ejs")
    } catch (err) {
        console.log(err)
    }

})

router.get('/show', isLoggedIn, async (req, res) => {
    try {
        const details = await AllIndia.find()
        res.render('AllindiaCrop/show.ejs', {
            details
        })
    } catch (err) {
        console.log(err)
    }
})



module.exports=router