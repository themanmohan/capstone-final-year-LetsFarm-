const express = require('express');
const Karnataka = require("../../model/cropDetail/Karnataka")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding crop detail (form) 
//@route     GET/karnatakacropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/Karnataka/add")
})

//@desc      showing detail  
//@route     GET/karnatakacropdetail/show
//@access    private('user)

router.get("/show",isLoggedIn, (req, res) => {
    Karnataka.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Karnataka/show", {
            cropDetail
        })
    })
})

//@desc      adding detail  
//@route     POST/karnatakacropdetail
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
    Karnataka.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/karnatakacropdetail/show")
    })

})
//@desc      update detail  
//@route     GET/karnatakacropdetail/:id/edit
//@access    private('admin)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {

    Karnataka.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Karnataka/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/karnatakacropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    Karnataka.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/karnatakacropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/karnatakacropdetail/:id
//@access    private('admin)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    Karnataka.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/karnatakacropdetail/show")
    })
})



module.exports = router