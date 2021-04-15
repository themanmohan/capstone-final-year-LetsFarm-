const express = require('express');
const Assam = require("../../model/cropDetail/Assam")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding crop detail (form) 
//@route     GET/assamcropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/Assam/add")
})

//@desc      showing detail  
//@route     GET/assamcropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    Assam.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Assam/show", {
            cropDetail
        })
    })
})


//@desc      add detail  
//@route     POST/assamcropdetail
//@access    private('admin only)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
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

//@desc      update detail  
//@route     GET/assamcropdetail/:id/edit
//@access    private('admin only)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {

    Assam.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Assam/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/assamcropdetail
//@access    private('admin only)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    Assam.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/assamcropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/assamcropdetail/:id/delete
//@access    private('admin only)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    Assam.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/assamcropdetail/show")
    })
})



module.exports = router