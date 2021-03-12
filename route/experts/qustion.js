const express = require("express");
const router = express.Router({
    mergeParams: true
});
//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")
//model
const Expert = require("../../model/experts/expert");
const Qustion = require("../../model/experts/qustion");


//@desc       add qustion
//@route     GET/experts/:expert_id/qustion/new
//@access    private
router.get('/new',isLoggedIn,(req,res)=>{
  Expert.findById(req.params.expert_id,(err,expert)=>{
      res.render("experts/addqustion",{expert})
  })
})

//@desc      add qustion
//@route     POST/experts/:expert_id/qustion/new
//@access    private
router.post('/',isLoggedIn, (req, res) => {
    Expert.findById(req.params.expert_id).populate("qustion").exec((err,expert)=>{
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Qustion.create(req.body.qustion,(err,qustion)=>{
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            //add author username/id and associated expert to the review
            qustion.author.id = req.user._id;
            qustion.author.username = req.user.name;
            qustion.experts = expert;
            //save review
            qustion.save();
            expert.qustion.push(qustion);
            expert.save();
            req.flash("success_msg", "Your qustion has been successfully added.");
            res.redirect('/experts/showexpert');
           
        })
    })
})


module.exports=router