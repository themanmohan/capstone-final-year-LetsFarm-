const express = require('express');
//model
const SoilDetail = require("../../model/soilreport/soildetail")
const SoilReport = require("../../model/soilreport/soilreport")
const router = express.Router({
     mergeParams: true
});

//middleware
const {
     authorize,
     isLoggedIn
} = require("../../middleware/auth")


//@desc     add report to  snapshot
//@route     GET/soildetails/detail_id/report/new
//@access    private(admin only)
router.get('/new', isLoggedIn, authorize('admin'), (req, res) => {
     SoilDetail.findById(req.params.detail_id, (err, detail) => {
          if (err) {

          }
          res.render("soilreport/report", {
               detail_id: req.params.detail_id,
               detail
          })
     })

})



//@desc     add report to  snapshot
//@route     POST/soildetails/detail_id/report
//@access    private(admin only)
router.post("/", isLoggedIn, authorize('admin'), (req, res) => {
     SoilDetail.findById(req.params.detail_id, (err, detail) => {
          if (err) {
                 req.flash(
                      'error_msg',
                      err.message
                 );
          }
          SoilReport.create(req.body.report, (err, report) => {

               if (err) {
                      req.flash(
                           'error_msg',
                           err.message
                      );
               }
               req.flash(
                    'success_msg',
                    'report added successfully'
               );
               report.author.id = req.user._id
               report.save()
               detail.report.push(report)
               detail.save()
               res.redirect("/soildetails/admindashboard")
          })

     })


})


//@desc     update report to  snapshot
//@route     PUT/soildetails/detail_id/report/report_id/edit
//@access    private(admin only)
router.get('/:report_id/edit', isLoggedIn, authorize('admin'), (req, res) => {

     SoilDetail.findById(req.params.detail_id, (err, detail) => {
          if (err) {
                 req.flash(
                      'error_msg',
                      err.message
                 );
          }

          SoilReport.findById(req.params.report_id, (err, report) => {
               if (err) {
                      req.flash(
                           'error_msg',
                           err.message
                      );
               }
               res.render('soilreport/editreport', {
                    detail,
                    report
               })
          })
     })

})


//@desc     update report to  snapshot
//@route     PUT/soildetails/detail_id/report/report_id/edit
//@access    private(admin only)
router.put('/:report_id', isLoggedIn, authorize('admin'), (req, res) => {
     SoilReport.findByIdAndUpdate(req.params.report_id, req.body.report, (err, updatereport) => {
          if (err) {
               req.flash(
                    'error_msg',
                    err.message
               );
               
          }
          req.flash(
               'success_msg',
               'report edited successfully'
          );
          res.redirect("/soildetails/admindashboard")

     })
})
module.exports = router