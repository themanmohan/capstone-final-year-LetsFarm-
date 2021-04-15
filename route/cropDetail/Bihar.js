const express = require('express');
const Bihar = require("../../model/cropDetail/Bihar")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding crop detail (form) 
//@route     GET/biharcropdetail/new
//@access    private('admin only)y)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/Bihar/add")
})

//@desc      showing detail  
//@route     GET/biharcropdetail/show
//@access    private('user)
router.get("/show",isLoggedIn, (req, res) => {
    Bihar.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Bihar/show", {
            cropDetail
        })
    })
})

//@desc      addding detail  
//@route     POST/biharcropdetail/
//@access    private('admin)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
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

//@desc      upadte detail  
//@route     GET/biharcropdetail/:id/edit
//@access    private('admin)
router.get("/:id/edit",isLoggedIn,authorize('admin'),(req, res) => {

    Bihar.findById(req.params.id, (err, foundData) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/Bihar/Edit", {
            foundData
        })
    })
})

//@desc      updte detail  
//@route     PATCH/biharcropdetail/:id
//@access    private('admin)
router.patch("/:id", isLoggedIn, authorize('admin'), (req, res) => {
    Bihar.findByIdAndUpdate(req.params.id, req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/biharcropdetail/show")
    })
})

//@desc      delete detail  
//@route     DELETE/biharcropdetail/:is
//@access    private('admin)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
    Bihar.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/biharcropdetail/show")
    })
})


module.exports = router