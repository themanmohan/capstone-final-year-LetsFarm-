const express = require('express');
const WestBengal = require("../../model/cropDetail/WestBengal")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding detail (form) 
//@route     GET/westbengalcropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/WestBengal/add")
})

//@desc      showing detail  
//@route     GET/westbengalcropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    WestBengal.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/WestBengal/show", {
            cropDetail
        })
    })
})

//@desc      adding detail  
//@route     POST/westbengalcropdetail
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
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
//@desc      update detail  
//@route     GET/westbengalcropdetail/:id/edit
//@access    private('admin)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {
    WestBengal.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/WestBengal/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/westbengalcropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    WestBengal.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/westbengalcropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/westbengalcropdetail/:id
//@access    private('admin)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    WestBengal.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/westbengalcropdetail/show")
    })
})


module.exports = router