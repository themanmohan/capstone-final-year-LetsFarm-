var mongoose = require('mongoose');

var soilreportSchema = new mongoose.Schema({
    report: {
        type:String,
        required:true
    },
   
    // author id and username fields
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    }
   

});


module.exports = new mongoose.model('SoilReport', soilreportSchema);
