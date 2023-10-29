import express from 'express'
import { createHash, isValidPassword } from './utils.js'
import {User} from './models/user.model.js'
import MongoStore from "connect-mongo"
import session from 'express-session'
import FileStore from 'session-file-store'

const app = express()

const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    //Session registrada en mongo atlas
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://bastsrojas:ptLuitYCTl6wE4jB@cluster0.wx37dwm.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}, ttl: 3600
    }),
    secret: "ClaveSecreta",
    resave: false,
    saveUninitialized: false,
}))

app.listen(port, () => {
    console.log(`Server corriendo con puerto ${port}`)
})

app.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age)  return res.status(400).send({ status: 400, error: 'Faltan datos' })
    let user = {
        first_name,
        last_name,
        email,
        age: age,
        password: createHash(password)
    };
    console.log(user)

     const usuario = await User.findOne({email:email}, {email: 1, first_name:1, last_name:1, password:1})
     if(!user) return res.status(400).send({status:"error", error:"User not found"})
     if(!isValidPassword(user, password)) return res.status(403).send({status: "error", error: "Password incorrecto" })

});
app.post('/login', async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password) return res.status(400).send({status: "error", error: "Valores incompletos"})
     const usuario = await User.findOne({email:email}, {email: 1, first_name:1, last_name:1, password:1})
     if(!usuario) return res.status(400).send({status:"error", error:"User not found"})
     if(!isValidPassword(user, password)) return res.status(403).send({status: "error", error: "Password incorrecto" })
     
});