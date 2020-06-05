const mongoose = require("mongoose")
const Schema = mongoose.Schema

var productSchema = new Schema(
    {
      imgUrl: {
        type: String
      },
      title: {
        type: String
      },
      price: {
        type: String
      },
      category:{
          type:String
      },
      ratings:{
          type:Number
      }
      
    },
    { timestamps: true }
  );

  

  
  var Product = mongoose.model("product", productSchema);
  
  module.exports = Product;
  