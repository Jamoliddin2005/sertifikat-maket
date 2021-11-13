const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DbUser = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", DbUser);