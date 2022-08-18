const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    ship_fee:{
        type:Number,
        default: 5,
    },
    payment: {
        type: String,
        require: true,
        default:"Direct",
    },
    delivery_time:{
        type: String,
        require: true,
        default: "Noon"
    },
    progress:{
      type: Number,
      default:0
    },
    user_information:{
        type: Object,
        require: true,
    },
    total:{
      type: Number,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("orders", orderSchema);