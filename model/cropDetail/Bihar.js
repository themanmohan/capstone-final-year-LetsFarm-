const mongoose = require("mongoose")

const biharCropDetailSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    increase: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("PunjabCrop", biharCropDetailSchema)