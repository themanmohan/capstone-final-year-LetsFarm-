const express = require('express');
const Haryana = require("../../model/cropDetail/Haryana")
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
    res.render("AllIndiaCrop/Haryana/add")
})

router.get("/show", (req, res) => {
    Haryana.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Haryana/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    Haryana.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/haryanacropdetail/show")
    })

})


module.exports = router