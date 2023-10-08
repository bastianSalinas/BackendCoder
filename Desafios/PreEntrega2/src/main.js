import express from "express"
import prodRouter from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"
import ProductManager from "./controllers/ProductManager.js"
import CartManager from "./controllers/CartManager.js"
import mongoose from "mongoose"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"

//El funcionamiento se valido con la extensión Thunder Client desde Visual Studio Code
const app = express()
//Se define puerto 8080 para ejecutar la aplicacion
const PORT = 8080
const product = new ProductManager()
const cart = new CartManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Se simplifica codigo de middleware colocando lo siguiente
app.use("/api/products", prodRouter)
app.use("/api/carts", cartRouter)

app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})
//-------------------------------------Mongoose----------------------------------------------------------//
mongoose.connect("mongodb+srv://bastsrojas:ptLuitYCTl6wE4jB@cluster0.wx37dwm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})

//-----Handlebars-----//
//------------------------Handlebars----------------------------------//
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//CSS Static
app.use("/", express.static(__dirname + "/public"))

app.get("/products", async (req, res) => {
    let allProducts  = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON());
    res.render("viewProducts", {
        title: "Vista Productos",
        products : allProducts
    });
})
app.get("/carts/:cid", async (req, res) => {
    let id = req.params.cid
    let allCarts  = await cart.getCartWithProducts(id)
    res.render("viewCart", {
        title: "Vista Carro",
        carts : allCarts
    });
})
