const express = require("express")
const cookieParser = require("cookie-parser")
const port = 8080

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//rutas vistas
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/setCookie", (req, res) =>{
    const { user } = req.body
    res.cookie("user", user, {maxAge: 10000})
    res.send("Cookie Creada")
})

app.get("/getCookie", (req, res) =>{
    const userCookie = req.cookies.user
    console.log("Cookie", userCookie)
    res.send("Cookie mostrada en consola")
})


// app.get('/setCookie', (req, res) => {
//     res.cookie('CoderCookie', 'Soy doña Cookie', {maxAge: 10000}).send('Cookie')
// })

// app.get('/getCookie', (req, res) => {
//     res.send(req.cookies)
// })

// app.get('/deleteCookie', (req, res) => {
//     res.clearCookie('CoderCookie').send('Cookie eliminada')
// })

// app.get('/setSignedCookie', (req, res) => {
//     res.cookie('Cookie firmada', 'recibo una cookie firmada', {maxAge: 10000, signed: true}).send('Cookie')
// })

app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})