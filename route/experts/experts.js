const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');
//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")

//model
const Expert = require('../../model/experts/expert');
const Review = require('../../model/experts/reviews');
const Qustion = require('../../model/experts/qustion');
const router = express.Router();




//define distination or file name for image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

//uploading into database
const upload = multer({
    storage: storage
});


//@desc       show expert
//@route     GET/experts/showexpert
//@access    private
router.get("/showexpert",isLoggedIn, function (req, res) {

    Expert.find().populate({
        path: "reviews",
        options: {
            sort: {
                createdAt: -1
            }
        } 
    // sorting the populated reviews array to show the latest first
    }).populate({
            path: "qustion",
           
            options: {
                sort: {
                    createdAt: -1
                }
            },
             populate: {
                 path: 'answer'
             }
            // sorting the populated reviews array to show the latest first
        }).exec(function (err, expert) {
        if (err || !expert) {
            req.flash("error", "some thing went wrong");
            return res.redirect("back");
        }
        res.render('experts/showexpert', {
            expert
        });

    });
});


//@desc      add expert
//@route     GET/experts/addexpert
//@access    private(admin only)

router.get('/addexpert',isLoggedIn,authorize('admin'), (req, res) => {
    res.render('experts/addexpert')
});


//@desc      add expert
//@route     POST/experts/addexpert
//@access    private(admin only)
router.post('/addexpert',isLoggedIn,authorize('admin'), upload.single('image'), (req, res) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../../', '/public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log(req.file.filename)

    Expert.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            item.save();
            req.flash(
                'success_msg',
                'Expert created succesfully'
            );
            res.redirect('/experts/showexpert');
        }
    });
});


//@desc      delete expert
//@route     DELETE/experts/:expert_is/delete
//@access    private(admin only)
router.delete("/:expert_id/delete",isLoggedIn,authorize('admin'), function (req, res) {
    Expert.findById(req.params.expert_id, function (err, expert) {
        if (err) {
            res.redirect("back");
        } else {
            // deletes all comments associated with the campground
            Qustion.remove({
                "_id": {
                    $in: expert.qustion
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/AllIndia");
                }
            // deletes all reviews associated with the campground
            Review.remove({
                "_id": {
                    $in: expert.reviews
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/AllIndia");
                }
                //  delete the expert
                expert.remove();
                req.flash("success", "expert delete deleted successfully!");
                res.redirect("back");
            });
            });
        }
    });
});

module.exports = router