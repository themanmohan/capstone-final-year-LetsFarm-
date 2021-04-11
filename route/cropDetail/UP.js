const express = require('express');
const UP = require("../../model/cropDetail/UP")
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
    res.render("AllIndiaCrop/UP/add")
})

router.get("/show", (req, res) => {
    UP.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/UP/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    UP.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/upcropdetail/show")
    })

})


module.exports = router