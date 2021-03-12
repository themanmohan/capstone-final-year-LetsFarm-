var mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({

    // qustion  text
    text: {
        type: String,
        required: "Please provide description.",
    },
    // author id and username fields
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
   
}, {
    // if timestamps are set to true, mongoose assigns createdAt and updatedAt fields to your schema, the type assigned is Date.
    timestamps: true
});

module.exports = mongoose.model("Answer", answerSchema);