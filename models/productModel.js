const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      require: true,
      unique: true,
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    maintenance_time:{
      type: Number,
      requrire: true
    },
    sold: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Products", productSchema);