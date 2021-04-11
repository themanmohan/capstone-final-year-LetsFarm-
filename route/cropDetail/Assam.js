const express = require('express');
const Assam = require("../../model/cropDetail/Assam")
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
    res.render("AllIndiaCrop/Assam/add")
})

router.get("/show", (req, res) => {
    Assam.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Assam/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    Assam.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/assamcropdetail/show")
    })

})


module.exports = router