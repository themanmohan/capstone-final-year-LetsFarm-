var mongoose = require('mongoose');

var soildetailSchema = new mongoose.Schema({
    name: String,
    email: String,
    img: {
        data: Buffer,
        contentType: String
    },
    // author id and username fields
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
     report: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "SoilReport"
     }],
   
});


module.exports = new mongoose.model('SoilDetail', soildetailSchema);
