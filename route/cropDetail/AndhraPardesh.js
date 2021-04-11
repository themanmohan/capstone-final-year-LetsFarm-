const express = require('express');
const AndhraPardesh = require("../../model/cropDetail/AndhraPardesh")
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
    res.render("AllIndiaCrop/AndharPardesh/add")
})

router.get("/show", (req, res) => {
    AndhraPardesh.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/AndharPardesh/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    AndhraPardesh.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/andhrapardeshcropdetail/show")
    })

})


module.exports = router