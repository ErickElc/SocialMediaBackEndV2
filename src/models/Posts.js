const mongoose = require("mongoose");


const postsSchema = mongoose.Schema({
    title: {type: String, required: true, min: 5, max: 300},
    // image: {type: File},
    autor: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
    createdDate: {type: Date, default: Date.now}
})

const postModel = mongoose.model("post", postsSchema);


module.exports = postModel;