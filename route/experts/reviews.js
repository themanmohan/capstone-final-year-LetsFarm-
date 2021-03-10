var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Expert = require("../../model/experts/expert");
var Review = require("../../model/experts/reviews");
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")
// var middleware = require("../middleware/middleware");

// Reviews Index
router.get("/", function (req, res) {
    Expert.findById(req.params.expert_id).populate({
        path: "reviews",
        options: {
            sort: {
                createdAt: -1
            }
        } // sorting the populated reviews array to show the latest first
    }).exec(function (err, expert) {
        console.log(expert)
        if (err || !expert) {
            // req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("experts/showallreviews", {
            expert
        });
        
    });
});

// Reviews New
router.get("/new", isLoggedIn, function (req, res) {
    // middleware.checkReviewExistence checks if a user already reviewed the campground, only one review per user is allowed
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

// Reviews Create
router.post("/", isLoggedIn, function (req, res) {
    //lookup campground using ID
    Expert.findById(req.params.expert_id).populate("reviews").exec(function (err, expert) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        console.log(expert.reviews)
        Review.create(req.body.review, function (err, review) {
            console.log(review)
            if (err) {
                req.flash("error", err.message);
                return res.redirect("back");
            }
            //add author username/id and associated campground to the review
            review.author.id = req.user._id;
            review.author.username = req.user.username;
            review.experts = expert;
            //save review
            review.save();
            expert.reviews.push(review);
            // calculate the new average review for the campground
            expert.rating = calculateAverage(expert.reviews);
            //save campground
            expert.save();
            req.flash("success", "Your review has been successfully added.");
            res.redirect('/experts/showexpert' );
        });
    });
});

// Reviews Edit
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

// Reviews Update
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
            // recalculate campground average
            expert.rating = calculateAverage(expert.reviews);
            //save changes
            expert.save();
            req.flash("success", "Your review was successfully edited.");
            res.redirect('/experts/showexpert');
        });
    });
});

// Reviews Delete
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
            // recalculate campground average
            expert.rating = calculateAverage(expert.reviews);
            //save changes
            expert.save();
            req.flash("success", "Your review was deleted successfully.");
            res.redirect("/experts/showexpert");
        });
    });
});

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