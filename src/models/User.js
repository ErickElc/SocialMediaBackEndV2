const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {type: String, required: true, min: 3, max: 100},
    age: {type: Number, required: true, min: 10, max: 120},
    email: {type: String, required: true, unique: true, min: 5, max: 100},
    password:{type: String, required: true, min: 6, max: 120},
    admin: {type: Boolean, default: false},
    createdDate: {type: Date, default: Date.now}
})
const userModel = mongoose.model("user", userSchema);


module.exports = userModel;