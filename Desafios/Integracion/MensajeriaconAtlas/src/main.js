import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import {Server} from "socket.io"
import mongoose from "mongoose"
import cartsRouter from "./router/carts.routes.js"
import messagesRouter from "./router/messages.routes.js"
import productsRouter from "./router/products.routes.js"
import uploadRouter from "./router/upload.routes.js"

//------------------Configuracion Inicial--------------------------------------//
//El funcionamiento se valido con la extensión Thunder Client desde Visual Studio Code
const app = express()


//Se define puerto 8080 para ejecutar la aplicacion
const PORT = 8080
//-----------------------------------------------------------------------------//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//------------------------------------------------------------------------------------//
//--------------------Validación de conexión mostrando el puerto---------------------//
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})
//-----------------------------------------------------------------------------------//
//-------------------------------------Mongoose----------------------------------------------------------//
mongoose.connect("mongodb+srv://bastsrojas:ptLuitYCTl6wE4jB@cluster0.wx37dwm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})
//------Rutas para probar CRUD con POSTMAN de carts, messages y products-----//
app.use("/api/carts", cartsRouter)
app.use("/api/msg", messagesRouter)
app.use("/api/prod", productsRouter)
//---------------------------------------------------------------------------//
//----------Prueba de multer con localhost:8080/upload------------//
app.use("/", uploadRouter) //Se manda la imagen desde el form-data de postman y se almacena en public/files
//---------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------//
//----------------Handlebars----------------------//
//------------------------Configuracion----------------------------------//
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
//CSS Static
app.use("/", express.static(__dirname + "/public"))

//-------------------------------------------------------------------------//
//--------------------------------Handelbars View-------------------------//
app.get("/chat", async (req, res) => {
    res.render("chat", {
        title: "Chat con Mongoose",
    })
})

app.get("/multer", async (req, res) => {
    res.render("upload", {
        title: "Multer",
    })
})
//------------------------------------------------------------------//


