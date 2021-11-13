const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DbProduct = new Schema({
    name: String,
    img: String
});

module.exports = mongoose.model("TopProduct", DbProduct);