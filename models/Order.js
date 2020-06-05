const mongoose = require("mongoose")
const Schema = mongoose.Schema

var orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          product:{
              type:Schema.Types.ObjectId,
              ref:"product"
          }
      
    },
    { timestamps: true }
  );

  var Order =mongoose.model("order",orderSchema)
  module.exports=Order;