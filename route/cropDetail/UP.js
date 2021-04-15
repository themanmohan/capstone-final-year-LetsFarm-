const express = require('express');
const UP = require("../../model/cropDetail/UP")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding detail (form) 
//@route     GET/upcropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/UP/add")
})

//@desc      showing detail  
//@route     GET/upcropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    UP.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/UP/show", {
            cropDetail
        })
    })
})

//@desc      adding detail  
//@route     POST/upcropdetail
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
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

//@desc      update detail  
//@route     GET/upcropdetail/:id/edit
//@access    private('admin)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {

    UP.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/UP/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/upcropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    UP.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/upcropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/upcropdetail/:id
//@access    private('admin)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    UP.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/upcropdetail/show")
    })
})


module.exports = router