import express from "express"
import prodRouter from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"

const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Se simplifica codigo de middleware colocando lo siguiente
app.use("/api/products", prodRouter)
app.use("/api/carts", cartRouter)

app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})