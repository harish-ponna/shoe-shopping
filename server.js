const express = require("express")
const hbs = require("hbs")
const session = require("express-session")
const methodOverride = require("method-override")
const dotenv = require("dotenv")
dotenv.config()
const path = require("path")
require("./db")


var PORT = process.env.PORT || 8080
const normalRoutes = require("./routes/normalRoutes")
const apiRoutes = require("./routes/apiRoutes")

const app = express()

app.use(express.urlencoded({extended:false}))

app.set("view engine", "hbs");
app.set("view options", {layout:"layout"});
hbs.registerPartials(path.join(__dirname, "views", "partials"))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({
    name:"shopping_session",
    secret:"shopping_cart",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60,
        httpOnly:true,
        sameSite:"strict",
        secure:false
    }
}))

app.get("/", function(req,res){
    res.redirect("/dashboard")
})

app.use(normalRoutes)
app.use(apiRoutes)

app.listen(PORT, function(){
    console.log(`server started on port ${PORT}`)
})