const express = require('express');
const Karnataka = require("../../model/cropDetail/Karnataka")
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
    res.render("AllIndiaCrop/Karnataka/add")
})

router.get("/show", (req, res) => {
    Karnataka.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Karnataka/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    Karnataka.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/karnatakacropdetail/show")
    })

})


module.exports = router