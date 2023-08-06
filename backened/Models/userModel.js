const mongoose = require("mongoose");

//Creating Schema
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    date : {
        type: String,
        required: true,
    },
    contact : {
        type: String,
        required : true,
    }
},
);


//Creating Model
const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel;



