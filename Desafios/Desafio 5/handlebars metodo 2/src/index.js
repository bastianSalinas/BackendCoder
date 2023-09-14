import express, {urlencoded} from "express"
import { engine } from "express-handlebars"
import __dirname from "./utils.js"
import * as path from "path"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(urlencoded({ extended: true}))

//Settings Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//aplicando estilo con un archivo estático
app.use("/", express.static(__dirname + "/public"))

const products = [
    {
        nombre: "Bastian",
        apellido: "Salinas"
    },
    {
        nombre: "Pedro",
        apellido: "Rojas"
    },
    {
        nombre: "Felipe",
        apellido: "Diaz"
    }
]

app.get("/", (req, res) => {
    res.render("home", {
    title: "Backend / Handlebars",
    //Rol de admin
    admin: true,
    //agregamos nuestros productos al render
    products : products
    })
})


app.listen(PORT, ()  => {
    console.log(`Servidor por Puerto ${PORT}`)
})