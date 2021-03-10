var multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();
// Step 6 - load the mongoose model for Image

var Expert = require('../../model/experts/expert');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({
    storage: storage
});

// Step 7 - the GET request handler that provides the HTML UI

router.get('/addexpert', (req, res) => {
            res.render('experts/addexpert')
});

// Step 8 - the POST handler for processing the uploaded file

router.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../../','/public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    
    Expert.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect('/experts/showexpert');
        }
    });
});

router.get('/showexpert', (req, res) => {
    Expert.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('experts/showexpert', {
                items: items
            });
        }
    });
});

module.exports=router