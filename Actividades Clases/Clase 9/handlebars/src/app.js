const express = require("express")
const handlebars = require("express-handlebars")
const app = express()
const PORT = 8080


app.engine("handlebars", handlebars.engine())

app.set("views", __dirname + "/views")

app.set("view engine", "handlebars")

app.use(express.static(__dirname + "/public"))

//----------------Actividad Clase mostrando usuario random por pantalla-----------//
const users = [
    {name: "usuario a", last_name: "apellido usera", age: 20, email: "usera@email.com", phone: 123456},
    {name: "usuario ab", last_name: "apellido userb", age: 21, email: "userb@email.com", phone: 123456},
    {name: "usuario abc", last_name: "apellido userc", age: 22, email: "userc@email.com", phone: 123456},
    {name: "usuario abcd", last_name: "apellido userd", age: 23, email: "userd@email.com", phone: 123456},
    {name: "usuario abcde", last_name: "apellido usere", age: 24, email: "usere@email.com", phone: 123456}
]
//-------------------------------Fin Actividad Clase----------------------------//

app.get("/", (req,res) => {
    // let testUser = {
    //     name: "Bastian",
    //     last_name: "Salinas"
    // }
    // res.render("index",testUser)

    //----------------Actividad Clase mostrando usuario random por pantalla-----------//
    const randomIndex = Math.floor(Math.random() * users.length)
    const randomUser = users[randomIndex]
    res.render("index", randomUser)
    //-------------------------------Fin Actividad Clase----------------------------//
})

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))