const express = require('express');
const Punjab = require("../../model/cropDetail/Punjab")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding crop detail (form) 
//@route     GET/punjabcropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/Punjab/add")
})

//@desc      showing detail  
//@route     GET/punjabcropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    Punjab.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Punjab/show", {
            cropDetail
        })
    })
})

//@desc      adding detail  
//@route     POST/punjabcropdetail
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
    Punjab.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/punjabcropdetail/show")
    })

})
//@desc      update detail  
//@route     GET/punjabcropdetail:id/edit
//@access    private('admin)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {

    Punjab.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Punjab/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/punjabcropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    Punjab.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/punjabcropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/punjabcropdetail/:id
//@access    private('admin)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    Punjab.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/punjabcropdetail/show")
    })
})



module.exports = router