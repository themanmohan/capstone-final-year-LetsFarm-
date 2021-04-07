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
const User = require("../../model/User/User");
const Answer = require("../../model/experts/answer");

//@desc      add answer to qustion
//@route     GET/experts/:expert_id/qustion/:qustion_id/answer/new
//@access    private(admin only)
router.get("/new", isLoggedIn, authorize('admin'), (req, res) => {
    res.render("experts/addanswer", {
        expert_id: req.params.expert_id,
        qustion_id: req.params.qustion_id
    })
})

//@desc      add answer to qustion
//@route     POST/experts/:expert_id/qustion/:qustion_id/answer/
//@access    private(admin only)
router.post('/', isLoggedIn, authorize('admin'),  (req, res) => {
    Expert.findById(req.params.expert_id, (err, expert) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }

        Qustion.findById(req.params.qustion_id).populate("answer").exec((err, qustion) => {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            Answer.create(req.body.answer, (err, answer) => {

                if (err) {
                    console.log(err)
                    return res.redirect("back");
                }
                answer.author.id = req.user._id;
                answer.author.username = req.user.name;
                //save review
                answer.save();
                qustion.answer.push(answer);
                qustion.save();
                req.flash("success_msg", "Your qustion has been successfully added.");
                res.redirect('/experts/showexpert');
            })
        })
    })
})

router.delete("/:ans_id/delete",(req,res)=>{
    Answer.findById(req.params.ans_id,(err,answer)=>{
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        answer.deleteOne()
         req.flash("success_msg", "answer deleted successfully");
         res.redirect('/experts/admindashboard');
    })
})

module.exports = router