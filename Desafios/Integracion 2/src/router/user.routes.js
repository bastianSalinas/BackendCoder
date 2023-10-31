import express from "express"
import UserManager from "../controllers/UserManager.js"
import { Router } from "express"
import { createHash, isValidPassword } from '../utils.js'
import passport from "passport"

const userRouter = Router()
const user = new UserManager()



userRouter.post("/register", passport.authenticate("register", {failureRedirect:"/failregister"}), async (req, res) => {
    try 
    {
        const { first_name, last_name, email, age, password,cart, rol }= req.body
        if (!first_name || !last_name || !email || !age)  return res.status(400).send({ status: 400, error: 'Faltan datos' })
        res.redirect("/")
    } catch (error) 
    {
        res.status(500).send("Error al acceder al registrar: " + error.message);
    }
})
userRouter.get("/failregister",async(req,res)=>{
    console.log("Failed Strategy")
    res.send({error: "Failed"})
})

userRouter.post("/login", passport.authenticate("login", {failureRedirect:"/faillogin"}),async (req, res) => {
    try 
    {
        if(!req.user) return res.status(400).send({status:"error", error: "Credenciales invalidas"})
        
        if(req.user.rol === 'admin'){
            req.session.emailUsuario = req.user.email
            req.session.nomUsuario = req.user.first_name
            req.session.apeUsuario = req.user.last_name
            req.session.rolUsuario = req.user.rol
            res.redirect("/profile")
        }
        else{
            req.session.emailUsuario = req.user.email
            req.session.rolUsuario = req.user.rol
            res.redirect("/products")
        }

    } 
    catch (error) 
    {
        res.status(500).send("Error al acceder al perfil: " + error.message);
    }
})
userRouter.get("/faillogin",async(req,res)=>{
    res.send({error: "Failed Login"})
})


export default userRouter