const express = require('express');
const Bihar = require("../../model/cropDetail/Bihar")
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
    res.render("AllIndiaCrop/Bihar/add")
})

router.get("/show", (req, res) => {
    Bihar.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Bihar/show", {
            cropDetail
        })
    })
})


router.post("/", (req, res) => {
    Bihar.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/biharcropdetail/show")
    })

})


module.exports = router