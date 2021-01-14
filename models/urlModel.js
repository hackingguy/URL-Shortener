const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    longURL:String,
    shortCode:String,
    shortURL:String,
    date: {type:String,default:Date.now()}
})

module.exports = mongoose.model("short-links",urlSchema);