const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DbCategory = new Schema({
  category: String,
});

module.exports = mongoose.model("categorie", DbCategory);