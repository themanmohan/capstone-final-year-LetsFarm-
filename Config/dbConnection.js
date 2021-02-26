const mongoose = require("mongoose")

const dbconnection = () => {
    mongoose.connect("mongodb://localhost/LetsFarm", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
module.exports =dbconnection