const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DbProduct = new Schema({
  name: String,
  price: String,
  select: String,
  img: String,
  categoryId: {
    ref: "categories",
    type: Schema.Types.ObjectId,
  },
  more: String,
});

module.exports = mongoose.model("product", DbProduct);
