// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var expertsSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
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

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Expert', expertsSchema);
