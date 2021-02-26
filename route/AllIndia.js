var express = require('express');
var AllIndia=require("../model/AllIndia")
var router = express.Router();

router.get("/add", async (req, res) => {
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

router.get('/show', async (req, res) => {
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