const express = require('express');
const Punjab = require("../../model/cropDetail/Punjab")
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
    res.render("AllIndiaCrop/Punjab/add")
})

router.get("/show", (req, res) => {
    Punjab.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Punjab/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    Punjab.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/punjabcropdetail/show")
    })

})


module.exports = router