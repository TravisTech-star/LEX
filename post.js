const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    content:{type:String},
    media:{type:String},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments:[{userId:String,text:String}]
},{timestamps:true});
module.exports = mongoose.model('Post', PostSchema);
