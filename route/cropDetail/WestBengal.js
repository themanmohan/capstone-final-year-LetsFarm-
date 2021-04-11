const express = require('express');
const WestBengal = require("../../model/cropDetail/WestBengal")
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
    res.render("AllIndiaCrop/WestBengal/add")
})

router.get("/show", (req, res) => {
    WestBengal.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/WestBengal/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    WestBengal.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/westbengalcropdetail/show")
    })

})


module.exports = router