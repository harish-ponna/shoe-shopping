var mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://harish:93rUaxIviFOZg5xz@cluster0-kuahz.mongodb.net/shoe-cart-shopping-site?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(function() {
    console.log("Database connected successfully");
  })
  .catch(function(err) {
    console.log(err.message);
  });
