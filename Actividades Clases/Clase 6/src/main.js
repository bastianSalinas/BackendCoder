// const http = require("http")

// const server = http.createServer((req, res) => {
//     res.end("Mi primer Hola Mundo en un Server")
// })

// server.listen(8080, () =>{
//     console.log("Servidor escuchando en el puerto 8080")
// })

const express = require("express")

const app = express()

const PORT = 8080

// app.get("/bienvenida", (req,res)=> {
//     const htmlResponse = `<p style="color:blue;">Bienvenido</p>`
//     res.send(htmlResponse)
// })

// app.get("/usuario", (req,res)=> {
//     const user={
//         nombre: "Rodrigo",
//         apellido: "Cortes",
//         edad: 25,
//         correo: "rodrigo@mail.com"
//     }
//     res.json(user)
// })

// app.get("/unparametro/:nombre/:apellido", (req,res)=> {
//     res.send(`Bienvenid@ ${req.params.nombre} ${req.params.apellido}`)
// })

const usuarios = [
    {id: "1", nombre: "Francisco", apellido: "Vega", edad: 30},
    {id: "2", nombre: "Rodrigo", apellido: "Cortes", edad: 20},
    {id: "3", nombre: "Katia", apellido: "Villavicencio", edad: 25}
]


app.get("/", (req,res)=>{
    res.send({usuarios})
})

app.get("/:idUsuario", (req, res)=>{
    let idUsuario = req.params.idUsuario

    let usuario = usuarios.find(u => u.id === idUsuario)

    if(!usuario) return res.send({error: "Error de usuario"})

    res.send({usuario})
})
app.listen(PORT, () => {
    console.log(`Server escuchando por ${PORT}`)
})