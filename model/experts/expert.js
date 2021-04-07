

var mongoose = require('mongoose');

var expertsSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    },
    qustion:[
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Qustion"
       }
    ],
    // author id and username fields
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
    rating: {
        type: Number,
        default: 0
        }
});


module.exports = new mongoose.model('Expert', expertsSchema);
