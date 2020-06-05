const express = require("express")
const router = express.Router()
const normalController = require("../controllers/normalControllers")
const authenticate = require("../middlewares/authenticate")

router.get("/register",normalController.renderRegister)
router.get("/login",normalController.renderLogin)
router.get("/dashboard",  normalController.renderDashboard)

router.get("/women",  normalController.renderWomen)

router.get("/men",  normalController.renderMen)

router.get("/kids",  normalController.renderKids)

router.get("/productdetails/:productid", normalController.renderProductDetails)

router.get("/thankyou", authenticate, normalController.renderThankyou)
 
 router.get("/cart",  authenticate,  normalController.renderCart)

module.exports=router