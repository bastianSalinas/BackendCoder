import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from '../utils.js'
import {User} from '../models/user.model.js'

// done(null, false)
// passport.use()

const localStrategy = local.Strategy
const initializePassport = () => {
    passport.use('/register', new localStrategy(
        {passReqToCallback: true, usernameField: "email"}, 
        async(req, username, password, done) =>{
            const {first_name, last_name, email, age} = req.body

            try
            {
                let user = await User.findOne({email:usernam})
                if(user){
                    console.log("El usuario ya existe")
                    return done(null,false)
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(passport)
                }
                let result = await User.create(newUser)
                return done(mull, result)
            }catch (error){
                return done("Error al obtener el usuario"+ error)
            }

        }
    ))
}