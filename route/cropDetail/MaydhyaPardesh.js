const express = require('express');
const MadhyaPardesh = require("../../model/cropDetail/Karnataka")
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
    res.render("AllIndiaCrop/MaydhyaPardesh/add")
})

router.get("/show", (req, res) => {
    MadhyaPardesh.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/MaydhyaPardesh/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    MadhyaPardesh.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/maydhyapardeshcropdetail/show")
    })

})


module.exports = router