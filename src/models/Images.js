const mongoose = require('mongoose');



const ImageSchema = mongoose.Schema({
    name: {type: String},
    size: {type:String},
    key: {type: String},
    url: {type: String},
    createdDate:{
        type: String,
        default: Date.now()
    }
})

const ImageModel = mongoose.model('images', ImageSchema);


module.exports = ImageModel;