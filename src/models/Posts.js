const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    content: {type: String, required: true, min: 5, max: 300 ,required:true},
    autor: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
    image_url: {type:String},
    createdDate: {type: Date, default: Date.now}
})

const postModel = mongoose.model("post", postsSchema);


module.exports = postModel;