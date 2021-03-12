const express = require("express");
const router = express.Router({
    mergeParams: true
});
const Expert = require("../../model/experts/expert");
const Review = require("../../model/experts/reviews");
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")
// var middleware = require("../middleware/middleware");
//@desc      show expert review
//@route     GET//experts/:expert_id/reviews
//@access    public
router.get("/", function (req, res) {
    
    Expert.findById(req.params.expert_id).populate({
        path: "reviews",
        options: {
            sort: {
                createdAt: -1
            }
        }
     // sorting the populated reviews array to show the latest first
    }).exec(function (err, expert) {
        console.log(expert)
        if (err || !expert) {
            req.flash("error", "something went wrong");
            return res.redirect("back");
        }
        res.render("experts/showallreviews", {
            expert
        });
        
    });
});

//@desc      add expert review
//@route     GET//experts/:expert_id/reviews/new
//@access    private
router.get("/new", isLoggedIn, function (req, res) {
    Expert.findById(req.params.expert_id, function (err, data) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("experts/addreviews", {
            expert:data
        });


    });
  
});

//@desc      add expert review
//@route     POST/experts/:expert_id/reviews
//@access    private
router.post("/", isLoggedIn, function (req, res) {
    
    Expert.findById(req.params.expert_id).populate("reviews").exec(function (err, expert) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Review.create(req.body.review, function (err, review) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            console.log(req.user)
            //add author username/id and associated expert to the review
            review.author.id = req.user._id;
            review.author.username = req.user.name;
            review.experts = expert;
            //save review
            review.save();
            expert.reviews.push(review);
            // calculate the new average review for the expert
            expert.rating = calculateAverage(expert.reviews);
            //save expert
            expert.save();
            req.flash("success", "Your review has been successfully added.");
            res.redirect('/experts/showexpert' );
        });
    });
});

//@desc      update expert review
//@route     GET//experts/:expert_id/reviews/:review_id/edit
//@access    private
router.get("/:review_id/edit", isLoggedIn, function (req, res) {
    Review.findById(req.params.review_id, function (err, foundReview) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("experts/editreviews", {
            expert_id: req.params.expert_id,
            review: foundReview
        });
    });
});

//@desc      update expert review
//@route     PUT/experts/:expert_id/reviews/:review_id
//@access    private
router.put("/:review_id", isLoggedIn, function (req, res) {
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, {
        new: true
    }, function (err, updatedReview) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Expert.findById(req.params.expert_id).populate("reviews").exec(function (err, expert) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            // recalculate expert average
            expert.rating = calculateAverage(expert.reviews);
            //save changes
            expert.save();
            req.flash("success", "Your review was successfully edited.");
            res.redirect('/experts/showexpert');
        });
    });
});

//@desc      delete expert review
//@route     GET//experts/:expert_id/reviews/:review_id
//@access    private
router.delete("/:review_id", isLoggedIn, function (req, res) {
    Review.findByIdAndRemove(req.params.review_id, function (err) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Expert.findByIdAndUpdate(req.params.expert_id, {
            $pull: {
                reviews: req.params.review_id
            }
        }, {
            new: true
        }).populate("reviews").exec(function (err, expert) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            // recalculate expert average
            expert.rating = calculateAverage(expert.reviews);
            //save changes
            expert.save();
            req.flash("success", "Your review was deleted successfully.");
            res.redirect("/experts/showexpert");
        });
    });
});

//calculating average rating


function calculateAverage(reviews) {
    if (reviews.length === 0) {
        return 0;
    }
    var sum = 0;
    reviews.forEach(function (element) {
        sum += element.rating;
    });
    return sum / reviews.length;
}

module.exports = router;