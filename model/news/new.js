const mongoose=require('mongoose')

const newsSchema=new mongoose.Schema({
    heading: {
        type: String,
        required: "Please provide heading.",
    },
    text: {
        type: String,
        required: "Please provide new.",
    },
    categories: {
        type: String,
        enum: ['MSP', 'fertilizer','all'],
        default: 'all'
    },
    time:{
        type: Date,
        default: Date.now
    }
},{
    capped: {
        size: 10240,
        max: 5,
        autoIndexId: true
    }
})

module.exports=mongoose.model('New',newsSchema)