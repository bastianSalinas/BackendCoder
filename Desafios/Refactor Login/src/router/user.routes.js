import express from "express"
import UserManager from "../controllers/UserManager.js"
import { Router } from "express"
import { createHash, isValidPassword } from '../utils.js'

const userRouter = Router()
const user = new UserManager()



userRouter.post("/register",(req, res) => {
    try 
    {
        const { first_name, last_name, email, age, password, rol }= req.body
        if (!first_name || !last_name || !email || !age)  return res.status(400).send({ status: 400, error: 'Faltan datos' })
        let newUser = {
            first_name,
            last_name,
            email,
            age: age,
            password: createHash(password),
            rol
        };
        user.addUser(newUser)
        res.redirect("/login")
    } catch (error) 
    {
        res.status(500).send("Error al acceder al registrar: " + error.message);
    }
})

userRouter.post("/login", async (req, res) => {
    try 
    {
        const { email, password} = req.body;
        if(!email || !password) return res.status(400).send({status: "error", error: "Valores incompletos"})
        const usuario = await user.findUser(email)
        if(!usuario) return res.status(400).send({status:"error", error:"Usuario no encontrado"})
        if(!isValidPassword(usuario, password)) return res.status(403).send({status: "error", error: "Contraseña incorrecta" })
              
        if(usuario && isValidPassword(usuario, password))
        {   
            if(usuario.rol === 'admin'){
                req.session.emailUsuario = email
                req.session.nomUsuario = usuario.first_name
                req.session.apeUsuario = usuario.last_name
                req.session.rolUsuario = usuario.rol
                res.redirect("/profile")
            }
            else{
                req.session.emailUsuario = email
                req.session.rolUsuario = usuario.rol
                res.redirect("/products")
            }
        
        }
        else
        {
            res.redirect("../../login")
        }

    } 
    catch (error) 
    {
        res.status(500).send("Error al acceder al perfil: " + error.message);
    }
})

userRouter.get("/logout", async (req, res) => {
    req.session.destroy((error) =>{
        if(error)
        {
            return res.json({ status: 'Logout Error', body: error})
        }
        res.redirect('../../login')
    })    
})

export default userRouter