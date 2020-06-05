const User = require("../models/Users")
const Product = require("../models/products")
const Cart = require("../models/Cart")
const Order = require("../models/Order")


module.exports = {
  postRegister: function (req, res) {
    req.session.userId = null;
    var user = new User({ ...req.body });
    user
      .save()
      .then(function (user) {
        req.session.userId = user._id;

        res.redirect("/dashboard");
      })
      .catch(function (err) {
        console.log(err);
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
      });
  },

  postLogin: function (req, res) {
    req.session.userId = null;
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password)
      return res.status(400).send("Incorrect credentials");
    User.findByEmailAndPassword(email, password)
      .then(function (user) {
        req.session.userId = user._id;
        console.log(req.session.userId)
        res.redirect("/dashboard");
      })
      .catch(function (err) {
        console.log(err.message);
        res.redirect("/login");
      });
  },

  logout: function (req, res) {
    req.session.destroy();
    return res.redirect("/");
  },

  postSearch:function(req,res){
    var search = req.body.search;
    console.log(search)
    Product.find({title:`${search}`}).then(function(products){
      return res.render('products', {
        products: products,
        user:req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
  },
  postAddtocart:function(req,res){
    if(!req.session.userId) return res.redirect("/register")
    var productId=req.params.productid;
    var cart = new Cart({
      product:productId,
      user:req.session.userId
    })
    cart.save()
    .then(function (cart) {
      res.redirect(`/productdetails/${productId}`);
    })
    .catch(function (err) {
      console.log(err);
    });
  },
  
  postBuy:function(req,res){
    if(!req.session.userId) return res.redirect("/register")
    var productId=req.params.productid;
    var order = new Order({
      product:productId,
      user:req.session.userId
    })
    order.save()
    .then(function (cart) {
      res.redirect('/thankyou');
    })
    .catch(function (err) {
      console.log(err);
    });
  }
}