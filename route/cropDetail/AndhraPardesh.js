const express = require('express');
const AndhraPardesh = require("../../model/cropDetail/AndhraPardesh")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding crop detail (form) 
//@route     GET/andhrapardeshcropdetail/new
//@access    private('admin only)
router.get("/new",isLoggedIn,authorize('admin'), (req, res) => {
    res.render("AllIndiaCrop/AndharPardesh/add")
})

//@desc      showing detail  
//@route     GET/andhrapardeshcropdetail/show
//@access    private('user)
router.get("/show", isLoggedIn,(req, res) => {
    AndhraPardesh.find({}, (err, cropDetail) => {
        if (err) {
            console.log(err)
        }
        res.render("AllIndiaCrop/AndharPardesh/show", {
            cropDetail
        })
    })
})


//@desc      adding detail  
//@route     POST/andhrapardeshcropdetail
//@access    private('admin only)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
    AndhraPardesh.create(req.body.cropdetail, (err, data) => {
        if (err) {
            console.log(err)
        }
        req.flash(
            'success_msg',
            'c added  successfully'
        );
        res.redirect("/andhrapardeshcropdetail/show")
    })

})

//@desc      update detail  
//@route     Get/andhrapardeshcropdetail/:id/edit
//@access    private('admin only)
router.get("/:id/edit", isLoggedIn, authorize('admin'), (req, res) => {
          
    AndhraPardesh.findById(req.params.id,(err,foundData)=>{
         if (err) {
             console.log(err)
         }
         res.render("AllIndiaCrop/AndharPardesh/Edit",{foundData})
    })
})

//@desc      update detail  
//@route     PATCH/andhrapardeshcropdetail/:id
//@access    private('admin only)
router.patch("/:id",(req,res)=>{
   AndhraPardesh.findByIdAndUpdate(req.params.id,req.body.cropdetail,(err,data)=>{
       if (err) {
           console.log(err)
       }
       res.redirect("/andhrapardeshcropdetail/show")
   })
})

//@desc      update detail  
//@route     DELETE/andhrapardeshcropdetail/:id/delete
//@access    private('admin only)
router.delete("/:id/delete", isLoggedIn, authorize('admin'), (req, res) => {
   AndhraPardesh.findByIdAndDelete(req.params.id,(err,data)=>{
       if (err) {
           console.log(err)
       }
       res.redirect("/andhrapardeshcropdetail/show")
   })
})


module.exports = router