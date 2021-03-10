var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Expert = require("../../model/experts/expert");
var Review = require("../../model/experts/reviews");
// var middleware = require("../middleware/middleware");

// Reviews Index
// router.get("/", function (req, res) {
//     University.findById(req.params.id).populate({
//         path: "reviews",
//         options: {
//             sort: {
//                 createdAt: -1
//             }
//         } // sorting the populated reviews array to show the latest first
//     }).exec(function (err, university) {
//         if (err || !university) {
//             req.flash("error", err.message);
//             return res.redirect("back");
//         }
//         res.render("reviews/index", {
//             university
//         });
//     });
// });

// Reviews New
router.get("/new", function (req, res) {
    // middleware.checkReviewExistence checks if a user already reviewed the campground, only one review per user is allowed
    Expert.findById(req.params.id, function (err, data) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("reviews/new", {
            data
        });

    });
});

// // Reviews Create
// router.post("/", middleware.isLoggedIn, middleware.checkReviewExistence, function (req, res) {
//     //lookup campground using ID
//     University.findById(req.params.id).populate("reviews").exec(function (err, university) {
//         if (err) {
//             req.flash("error", err.message);
//             return res.redirect("back");
//         }
//         console.log(req.body.review)
//         Review.create(req.body.review, function (err, review) {
//             if (err) {
//                 req.flash("error", err.message);
//                 return res.redirect("back");
//             }
//             //add author username/id and associated campground to the review
//             review.author.id = req.user._id;
//             review.author.username = req.user.username;
//             review.university = university;
//             //save review
//             review.save();
//             university.reviews.push(review);
//             // calculate the new average review for the campground
//             university.rating = calculateAverage(university.reviews);
//             //save campground
//             university.save();
//             req.flash("success", "Your review has been successfully added.");
//             res.redirect('/University/' + university._id);
//         });
//     });
// });

// // Reviews Edit
// router.get("/:review_id/edit", function (req, res) {
//     Review.findById(req.params.review_id, function (err, foundReview) {
//         if (err) {
//             req.flash("error", err.message);
//             return res.redirect("back");
//         }
//         res.render("reviews/edit", {
//             university_id: req.params.id,
//             review: foundReview
//         });
//     });
// });

// // Reviews Update
// router.put("/:review_id", function (req, res) {
//     Review.findByIdAndUpdate(req.params.review_id, req.body.review, {
//         new: true
//     }, function (err, updatedReview) {
//         if (err) {
//             req.flash("error", err.message);
//             return res.redirect("back");
//         }
//         University.findById(req.params.id).populate("reviews").exec(function (err, university) {
//             if (err) {
//                 req.flash("error", err.message);
//                 return res.redirect("back");
//             }
//             // recalculate campground average
//             university.rating = calculateAverage(university.reviews);
//             //save changes
//             university.save();
//             req.flash("success", "Your review was successfully edited.");
//             res.redirect('/University/' + university._id);
//         });
//     });
// });

// // Reviews Delete
// router.delete("/:review_id", middleware.checkReviewOwnership, function (req, res) {
//     Review.findByIdAndRemove(req.params.review_id, function (err) {
//         if (err) {
//             req.flash("error", err.message);
//             return res.redirect("back");
//         }
//         University.findByIdAndUpdate(req.params.id, {
//             $pull: {
//                 reviews: req.params.review_id
//             }
//         }, {
//             new: true
//         }).populate("reviews").exec(function (err, university) {
//             if (err) {
//                 req.flash("error", err.message);
//                 return res.redirect("back");
//             }
//             // recalculate campground average
//             university.rating = calculateAverage(university.reviews);
//             //save changes
//             university.save();
//             req.flash("success", "Your review was deleted successfully.");
//             res.redirect("/University/" + req.params.id);
//         });
//     });
// });

// function calculateAverage(reviews) {
//     if (reviews.length === 0) {
//         return 0;
//     }
//     var sum = 0;
//     reviews.forEach(function (element) {
//         sum += element.rating;
//     });
//     return sum / reviews.length;
// }

module.exports = router;