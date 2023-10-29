import path from "path"
import { fileURLToPath } from "url"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import passport from "passport"

const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret"

export const passportCall = (strategy) => {
    return async(req, res, next) =>{
        passport.authenticate(strategy, function(err,user, info){
            if(err) return next (err)
            if(!user){
                return res.status(401).send({error:info.messages?info.messages:info.toString()})
            }
            req.user = user
            next()
        })(req, res, next)
    }  
}
export const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24h"})
    return token
}
export const authToken = (req, res, next) =>{
    const authHeader = req.headers.authorization
    if(!authToken) return res.status(401).send({
        error: "Noy authenticated"
    })
    const token = authHeader.split(" ")[1]
    jwt.verify(token, PRIVATE_KEY,(error, credentials)=>{
        if(error) return res.status(403).send({error: "Not authorized"})

        req.user = credentials.user
        next()
    })
}

export const createHash = async password => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const isValidPassword = (user,password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname