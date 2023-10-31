import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import session from 'express-session'
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
import * as path from "path"
import __dirname, { authorization, passportCall } from "./utils.js"
import initializePassport from "./config/passport.config.js"
import MongoStore from "connect-mongo"
import UserManager from "./controllers/UserManager.js"

const users = new UserManager()

const app = express()

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

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Secret-key"
}

passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done)=>{
        const user = users.findJWT((user) =>user.email ===jwt_payload.email)
        if(!user)
        {
            return done(null, false, {message:"Usuario no encontrado"})
        }
        return done(null, user)
    })
)


//app.use("/api/sessions", userRouter)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(passport.session())

app.post("/login", async (req,res)=>{
    const {email, password} = req.body
    const emailToFind = email
    const user = await users.findEmail({ email: emailToFind })
    if(!user || user.password !== password){
        return res.status(401).json({message: "Error de autenticacion"})
    }
    const token = jwt.sign({email,password, role:"user"}, "Secret-key", {expiresIn: "24h"})
    res.cookie("token", token, {httpOnly: true, maxAge: 60*60*1000})
    res.json({token})   
})
app.post("/api/register", async(req,res)=>{
    const {first_name, last_name, email,age, password, cart, rol} = req.body
    const emailToFind = email
    const exists = await users.findEmail({ email: emailToFind })
    if(exists) return res.status(400).send({status:"error", error: "Usuario ya existe"})
    const newUser = {
        first_name,
        last_name,
        email,
        age,
        password,
        cart,
        rol
    };
    users.addUser(newUser)
    const token = jwt.sign({email,password, role:"user"}, "Secret-key", {expiresIn: "24h"})
    res.cookie("token", token, {httpOnly: true, maxAge: 60*60*1000})
    res.send({status: "success", token}) 
})
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: app.get('views') });
});
app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: app.get('views') });
});
app.get('/current', passportCall('jwt'), authorization('user'), (req,res) =>{
    res.send(req.user)
    res.sendFile('home.html', { root: app.get('views') });
})

app.listen(8080, () => {
    console.log("Servidor corriendo en puerto 8080")
})
//-------------------------------------Mongoose----------------------------------------------------------//
mongoose.connect("mongodb+srv://bastsrojas:ptLuitYCTl6wE4jB@cluster0.wx37dwm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado con Mongo Atlas")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})