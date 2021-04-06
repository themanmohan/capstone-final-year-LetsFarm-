const mongoose = require("mongoose")

const AllindiaMSPSchema = mongoose.Schema({
    product: {
        type:String,
        required:true
    },
    msp: {
        type: Number,
        required: true
    },
     increase: {
         type: Number,
         required: true
     }
    
})

module.exports = mongoose.model("MSP", AllindiaMSPSchema)