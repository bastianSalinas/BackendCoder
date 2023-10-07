import express from "express"
import prodRouter from "./router/product.routes.js"
import cartRouter from "./router/cart.routes.js"
import mongoose from "mongoose"

//El funcionamiento se valido con la extensión Thunder Client desde Visual Studio Code
const app = express()
//Se define puerto 8080 para ejecutar la aplicacion
const PORT = 8080

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