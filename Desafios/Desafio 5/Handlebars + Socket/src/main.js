import express from "express"
import prodRouter from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import ProductManager from "./controllers/ProductManager.js"

//El funcionamiento se valido con la extensión Thunder Client desde Visual Studio Code
const app = express()
//Se define puerto 8080 para ejecutar la aplicacion
const PORT = 8080
const product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//CSS Static
app.use("/", express.static(__dirname + "/public"))

app.get("/", async (req, res) => {
    let allProducts  = await product.getProducts()
    res.render("index", {
        title: "Handlebars",
        products : allProducts
    })
})

//Se simplifica codigo de middleware colocando lo siguiente
app.use("/api/products", prodRouter)
app.use("/api/carts", cartRouter)

app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})