const express = require('express');
const MSP = require("../../model/MSP/Allindia")
const router = express.Router();

//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")


//@desc      adding msp (form) 
//@route     GET/msp/new
//@access    private('admin only)
router.get("/new",isLoggedIn,authorize('admin'),(req,res)=>{
res.render("MSP/new")
})

//@desc      display msp 
//@route     get/msp/show
//@access    private
router.get("/show",isLoggedIn, (req, res) => {
   MSP.find({},(err,msp)=>{
       if (err) {
           console.log(err)
       }

       const filtermsp=msp.map(msp=>{
           return msp.msp
       })
       const filterproduct = msp.map(product => {
           return product.product
       })
  
     
       
       res.render("MSP/show", {
           msp,
           filtermsp,
           filterproduct
       })
       
   })

 
})
//@desc      adding msp 
//@route     POST/msp
//@access    private('admin only)
router.post("/",isLoggedIn,authorize('admin'), (req, res) => {
    MSP.create(req.body.msp,(err,data)=>{
        if(err){
            console.log(err)
        }
         req.flash(
             'success_msg',
             'MSP added  successfully'
         );
        res.redirect("/msp/show")
    })
    
})

//@desc      edit msp  form
//@route     get/msp/:msp_id
//@access    private('admin only)
router.get("/:msp_id/edit", isLoggedIn, authorize('admin'), (req, res) => {
    MSP.findById(req.params.msp_id,(err,msp)=>{
        if(err){
            console.log(err)
        }
        res.render("MSP/edit",{msp})
    })
})

//@desc      edit msp  
//@route     put/msp/:msp_id
//@access    private('admin only)
router.put('/:msp_id',(req,res)=>{
   MSP.findByIdAndUpdate(req.params.msp_id,req.body.msp,(err,updatedmsp)=>{
       if (err) {
           console.log(err)
       }
       req.flash(
           'success_msg',
           'MSP edited  successfully'
       );
       res.redirect("/msp/show")
   })
})

//@desc      delete msp  
//@route     delete/msp/:msp_id/delete
//@access    private('admin only)
router.delete("/:msp_id/delete", isLoggedIn, authorize('admin'), (req, res) => {
   MSP.findById(req.params.msp_id,(err,deletemsp)=>{
       if (err) {
           console.log(err)
       }

       deletemsp.deleteOne()
        req.flash(
            'success_msg',
            'MSP delete  successfully'
        );
         res.redirect("back")
   })
})

module.exports = router