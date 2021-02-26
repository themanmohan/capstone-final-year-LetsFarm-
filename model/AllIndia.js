const mongoose = require("mongoose")

const AllindiaSchema=mongoose.Schema({
    SugarCane:Number,
    Wheat:Number,
    MilkBuffalo:Number,
    MilkCow:Number,
    Potatoes:Number,
    Vegitable:Number,
    Bannas:Number,
    Corn:Number,
    Oninons:Number,
    Mangoes:Number,
    Tomatoes:Number,
    SeedCotton:Number,
    Soybens:Number,
    Eggplants:Number,
    Coconuta:Number,
    Millet:Number,
    ChickPeas:Number,
    Fruit:Number,
    Cabbage:Number,
    Suggestion:String

},{
    timestamps: true
})

module.exports=mongoose.model("Allindia",AllindiaSchema)