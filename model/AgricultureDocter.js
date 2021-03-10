const mongoose = require("mongoose")

const AgricultureDoctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Qualification:{
         type:String,
         required:true
    },
    Specilization: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("AgriticultureDoctor",AgricultureDoctorSchema)