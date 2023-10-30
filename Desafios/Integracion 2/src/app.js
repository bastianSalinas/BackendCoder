import express from "express"
import passport from "passport"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt as ExtractJwt } from 'passport-jwt';
import * as path from "path"
import __dirname from "./utils.js"

const app = express()

const users = [
    {id:1, email:"test@example.com", password:"pass123"}
]

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Secret-key"
}

passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done)=>{
        const user = users.find((user) =>user.email ===jwt_payload.email)
        if(!user)
        {
            return done(null, false, {message:"Usuario no encontrado"})
        }
        return done(null, user)
    })
)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(passport.initialize());

app.post("/login", (req,res)=>{
    const {email, password} = req.body
    const user = users.find((user) => user.email === email)
    if(!user || user.password !== password){
        return res.status(401).json({message: "Error de autenticacion"})
    }
    const token = jwt.sign({email}, "Secret-key", {expiresIn: "24h"})
    res.cookie("token", token, {httpOnly: true, maxAge: 60*60*1000})
    res.json({token})   
})
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: app.get('views') });
  });

app.listen(8080, () => {
    console.log("Servidor corriendo en puerto 8080")
})