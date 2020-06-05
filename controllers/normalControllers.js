const Product = require("../models/products")
const Cart = require("../models/Cart")
const User = require("../models/Users")
module.exports = {
  renderRegister: function (req, res) {
    if (req.session.userId) res.redirect("/dashboard")
    res.render("register")
  },

  renderLogin: function (req, res) {
    if (req.session.userId) res.redirect("/dashboard")
    res.render("login")
  },

  renderDashboard: function (req, res) {
    if(req.session.userId){
    var cartCount = null;
    Cart.find({ user: req.session.userId }).count(function (err, count) {
      cartCount = count;

    })
  }
    Product.find({}).then(function (products) {
      return res.render('products', {
        products: products,
        cartCount: cartCount,
        user:req.session.userId
      })
    }).catch(function (err) {
      console.log(err)
      return res.status(500).send('Server Error')
    })
  },
  
  renderWomen: function (req, res) {
    if(req.session.userId){
      var cartCount = null;
      Cart.find({ user: req.session.userId }).count(function (err, count) {
        cartCount = count;
      })
    }
    Product.find({ category: "Women" }).then(function (products) {
      return res.render('products', {
        products: products,
        cartCount: cartCount,
        user:req.session.userId
      })
    }).catch(function (err) {
      console.log(err)
      return res.status(500).send('Server Error')
    })
  },
  
  renderMen: function (req, res) {
    if(req.session.userId){
      var cartCount = null;
      Cart.find({ user: req.session.userId }).count(function (err, count) {
        cartCount = count;
      })
    }
    Cart.find({ user: req.session.userId }).count(function (err, count) {
      req.session.count = count;
    })
    Product.find({ category: "Men" }).then(function (products) {
      return res.render('products', {
        products: products,
        cartCount: cartCount,
        user:req.session.userId
      })
    }).catch(function (err) {
      console.log(err)
      return res.status(500).send('Server Error')
    })
  },
  renderKids: function (req, res) {
    if(req.session.userId){
      var cartCount = null;
    Cart.find({ user: req.session.userId }).count(function (err, count) {
      cartCount = count;
    })
  }
  Product.find({ category: "Kids" }).then(function (products) {
    return res.render('products', {
      products: products,
      cartCount: cartCount,
      user:req.session.userId
      })
    }).catch(function (err) {
      console.log(err)
      return res.status(500).send('Server Error')
    })
  },

  renderProductDetails: function (req, res) {
    var productId = req.params.productid
    var cartCount = null;
    Cart.find({ user: req.session.userId }).count(function (err, count) {
      cartCount = count;
    })
    Product.findById(productId).then(function (shoe) {
      return {
        id: shoe.id,
        imgUrl: shoe.imgUrl,
        title: shoe.title,
        price: shoe.price,
        ratings: shoe.ratings,
        category: shoe.category
      }
    }).then(function (shoeObj) {
      Product.find({ category: shoeObj.category }).limit(5).then(function (products) {
        return res.render('productDetails', {
          products: products,
          id: shoeObj.id,
          imgUrl: shoeObj.imgUrl,
          title: shoeObj.title,
          price: shoeObj.price,
          ratings: shoeObj.ratings,
          category: shoeObj.category,
          cartCount: cartCount,
          user:req.session.userId
        })
      })
    }).catch(function (err) {
      console.log(err)
    })
  },

  renderThankyou: function (req, res) {
    var cartCount = null;
    Cart.find({ user: req.session.userId }).count(function (err, count) {
      cartCount = count;
    })
    res.render("thankyou", {
      cartCount: cartCount,
      user:req.session.userId
    })
  },
  renderCart: function (req, res) {
    Cart.find({ user: req.session.userId }).populate("product").then(function (products) {
    return res.render("cart",{
      products:products,
      user:req.session.userId
    })
    })
  }

}