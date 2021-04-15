const express = require('express');
const Gujarat = require("../../model/cropDetail/Gujarat")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding cropdetail (form) 
//@route     GET/gujaratcropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/Gujarat/add")
})

//@desc      showing detail  
//@route     GET/gujaratcropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    Gujarat.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Gujarat/show", {
            cropDetail
        })
    })
})

//@desc      adding detail  
//@route     POST/gujaratcropdetail
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
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

//@desc      update detail  
//@route     GET/gujaratcropdetail:id/edit
//@access    private('admin)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {

    Gujarat.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Gujarat/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/gujaratcropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    Gujarat.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/gujaratcropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/gujaratcropdetail/:id
//@access    private('admin)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    Gujarat.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/gujaratcropdetail/show")
    })
})



module.exports = router