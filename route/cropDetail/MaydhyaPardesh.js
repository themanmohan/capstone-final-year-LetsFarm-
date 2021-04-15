const express = require('express');
const MadhyaPardesh = require("../../model/cropDetail/Karnataka")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding crop detail (form) 
//@route     GET/maydhyapardeshcropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/MaydhyaPardesh/add")
})

//@desc      showing detail  
//@route     GET/maydhyapardeshcropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    MadhyaPardesh.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/MaydhyaPardesh/show", {
            cropDetail
        })
    })
})

//@desc      adding detail  
//@route     POST/maydhyapardeshcropdetail
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
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
//@desc      update detail  
//@route     GET/maydhyapardeshcropdetail/:id/edit
//@access    private('admin)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {

    MadhyaPardesh.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/MaydhyaPardesh/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/maydhyapardeshcropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    MadhyaPardesh.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/maydhyapardeshcropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/maydhyapardeshcropdetail/:id
//@access    private('admin)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    MadhyaPardesh.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/maydhyapardeshcropdetail/show")
    })
})



module.exports = router