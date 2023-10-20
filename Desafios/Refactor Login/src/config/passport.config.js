import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from '../utils.js'
import UserManager from "../controllers/UserManager.js"



const LocalStrategy = local.Strategy
const userMan = new UserManager()
const initializePassword = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
          const { first_name, last_name, email, age, rol } = req.body;
      
          try {
            let user = await userMan.findEmail({ email: username })
            if (user) {
              console.log("El usuario ya existe");
              return done(null, false);
            }
      
            const hashedPassword = await createHash(password);
      
            const newUser = {
              first_name,
              last_name,
              email,
              age,
              password: hashedPassword,
              rol
            };
      
            let result = await userMan.addUser(newUser);
            return done(null, result);
          } catch (error) {
            return done("Error al obtener el usuario" + error);
          }
        }))
        passport.serializeUser((user, done) => {
            done(null, user._id)
        })
        passport.deserializeUser(async (id, done) => {
            let user = await userMan.getUserById(id)
            done(null, user)
        })
        passport.use('login', new LocalStrategy({usernameField: "email"}, async(username, password, done) => {
            try
            {
                const user = await userMan.findEmail({email:username})
                if(!user)
                {
                    console.log("Usuario no existe")
                    return done (null, false)
                }
                if(!isValidPassword(user, password)) return done (null, false)
                return done(null, user)
            }
            catch(error)
            {
                return done(error)
            }
        }))
}

export default initializePassword