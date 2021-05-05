const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');
//model
const SoilDetail = require("../../model/soilreport/soildetail")
const SoilReport = require("../../model/soilreport/soilreport")
//middleware
const {
    authorize,
    isLoggedIn
} = require("../../middleware/auth")

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

//@desc     show report at adddetails 
//@route     GET/soildetails/new
//@access    private
router.get('/new', isLoggedIn, (req, res) => {
    SoilDetail.find().populate("report").exec((err, detail) => {
        if (err) {
            console.log(err)
        }
        res.render("soilreport/adddetails", {
            detail
        })

    })
})


//@desc      show all the snapshot of soil at admin dashboard
//@route     GET/soildetails/admindashboard
//@access    private(admin only)
router.get('/admindashboard', isLoggedIn, authorize('admin'), (req, res) => {
    SoilDetail.find({}).populate("report").exec((err, detail) => {
        if (err) {
            console.log(err)
        }
        res.render("soilreport/admindashboard", {
            detail
        })
    })

})


//@desc      add  snapshot
//@route     POST/soildetails
//@access    private
router.post('/', isLoggedIn, upload.single('image'), (req, res) => {

    var obj = {
        name: req.user.name,
        email: req.user.email,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../../', '/public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
   
    
    SoilDetail.create(obj, (err, detail) => {
        if (err) {
            console.log(err);
        } else {
            detail.author.id = req.user._id
            detail.save();
            req.flash(
                'success_msg',
                'Photo uploaded successfully we will reply you with in day'
            );
            res.redirect('back');
        }
    });
});

router.get("/:id",(req,res)=>{
    SoilDetail.findById(req.params.id,(err,founddata)=>{
        if (err) {
            console.log(err);
        }
        res.render("soilreport/fullImage",{founddata})

    })
})

//@desc      delete detail and   snapshot
//@route     DELETE/soildetails/detail_id/delete
//@access    private
router.delete('/:detail_id/delete', (req, res) => {
    SoilDetail.findByIdAndDelete(req.params.detail_id, (err, detail) => {
        if (err) {
            console.log(err)
        }
        // deletes all comments associated with the campground
        SoilReport.deleteMany({
            "_id": {
                $in: detail.report
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return res.redirect("back");
            }
            req.flash(
                'success_msg',
                'detail created succesfully'
            );
            res.redirect('back');
        })

    })
})

module.exports = router