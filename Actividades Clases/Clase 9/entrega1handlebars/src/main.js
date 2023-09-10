const express = require("express")
const handlebars = require("express-handlebars")



//El funcionamiento se valido con la extensión Thunder Client desde Visual Studio Code
const app = express()
//Se define puerto 8080 para ejecutar la aplicacion
const PORT = 8080

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')
app.set("view engine", "handlebars")
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) =>{
    let testUser = {
        name: "Bastian",
        last_name: "Salinas"
    }
    res.render('index', testUser)
} )


app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})