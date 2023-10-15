import express from  'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'

const port = 8080
const fileStorage = FileStore(session)

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(session({
    //Session registrada en mongo atlas
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://bastsrojas:ptLuitYCTl6wE4jB@cluster0.wx37dwm.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 15
    }),
    secret: "asd3ñc3okasod",
    resave: true,
    saveUninitialized: true

    //Session registrada de forma local en una carpeta
    // store: new fileStorage({path:'./sessions', ttl: 100, retries:0 }),
    // secret: "asd3ñc3okasod",
    // resave: true,
    // saveUninitialized: true
}))

app.get("/", (req,res) => {
    res.send("Desde el home")
})

app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})

