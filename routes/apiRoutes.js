const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiControllers");
const authenticate = require("../middlewares/authenticate");

router.post("/register",apiController.postRegister);
router.post("/login",apiController.postLogin);
router.delete("/logout",apiController.logout);
router.post("/search", apiController.postSearch);

router.post("/addtocart/:productid", apiController.postAddtocart);

router.post("/buy/:productid",
authenticate,
apiController.postBuy);

module.exports=router;