const mongoose = require("mongoose")

const upCropDetailSchema = mongoose.Schema({
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

module.exports = mongoose.model("UPCrop", upCropDetailSchema)