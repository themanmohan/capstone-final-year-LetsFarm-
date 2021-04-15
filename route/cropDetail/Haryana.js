const express = require('express');
const Haryana = require("../../model/cropDetail/Haryana")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding crop detail (form) 
//@route     GET/haryanacropdetail/new
//@access    private('admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/Haryana/add")
})

//@desc      showing detail  
//@route     GET/haryanacropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    Haryana.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Haryana/show", {
            cropDetail
        })
    })
})

//@desc      adding detail  
//@route     POST/haryanacropdetail
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
    Haryana.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/haryanacropdetail/show")
    })

})
//@desc      update detail  
//@route     GET/haryanacropdetail/:id/edit
//@access    private('admin)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {

    Haryana.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Haryana/Edit", {
            foundData
        })
    })
})

//@desc      update detail  
//@route     PATCH/haryanacropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    Haryana.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/haryanacropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/haryanacropdetail/:id
//@access    private('admin)
router.delete("/:id/delete" , isLoggedIn, authorize('admin'), (req, res) => {
    Haryana.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/haryanacropdetail/show")
    })
})



module.exports = router