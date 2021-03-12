var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: "Please provide a rating (1-5 stars).",
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value."
        }
    },
    // qustion
    text: {
        type: String,
        required: "Please provide qustion.",
    },
    // author id and username fields
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    // expert associated with the qustion
    experts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);