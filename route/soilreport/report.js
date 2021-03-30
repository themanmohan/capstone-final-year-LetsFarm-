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
router.get('/report/new',isLoggedIn,authorize('admin'), (req, res) => {
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
router.post("/report", isLoggedIn, authorize('admin'), (req, res) => {
     SoilDetail.findById(req.params.detail_id, (err, detail) => {
          if (err) {
               console.log(err)
          }
          SoilReport.create(req.body.report, (err, report) => {

               if (err) {
                    console.log(err)
               }
               report.author.id = req.user._id
               report.save()
               detail.report.push(report)
               detail.save()
               res.redirect("/soildetails/admindashboard")
          })

     })


})


module.exports = router