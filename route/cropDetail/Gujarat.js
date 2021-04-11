const express = require('express');
const Gujarat = require("../../model/cropDetail/Gujarat")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding msp (form) 
//@route     GET/msp/new
//@access    private('admin only)
router.get("/new", (req, res) => {
    res.render("AllIndiaCrop/Gujarat/add")
})

router.get("/show", (req, res) => {
    Gujarat.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Gujarat/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    Gujarat.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/gujaratcropdetail/show")
    })

})


module.exports = router