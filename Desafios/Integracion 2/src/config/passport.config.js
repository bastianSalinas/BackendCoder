import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword, generateToken} from '../utils.js'
import UserManager from "../controllers/UserManager.js"
import GitHubStrategy from "passport-github2"
import jwt from "passport-jwt"

const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret"

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const userMan = new UserManager()

const cookieExtractor = req => {
  let token = null
  if(req && req.cookies){
    token = req.cookies["coderCookieToken"]
  }
  return token
}
const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
      jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: "CoderKeyQueFuncionaComoUnSecret",
    },async(jwt_payload,done) =>{
      try{
        return done(null, jwt_payload)
      }
      catch(err){
        return done(err)
      }
    }
    ))
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
            const access_token = generateToken(newUser)
            return done(null, { user: result, access_token });
          } catch (error) {
            return done("Error al obtener el usuario" + error);
          }
        }))
        passport.serializeUser((user, done) => {
            done(null, user.user._id)
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
                const access_token = generateToken(user)
                return done(null, { user: user, access_token })
            }
            catch(error)
            {
                return done(error)
            }
        }))
        passport.use('github', new GitHubStrategy({
          clientID: "Iv1.765c1a483a7f1fcc",
          clientSecret: "6ca9209b51323792574cab20f84433f2b9f95144",
          callbackURL: "http://localhost:8080/api/sessions/githubcallback"
        }, async (accessToken, refreshToken, profile, done)=>{
          try
          {
            let user = await userMan.findEmail({email:profile._json.email})
            if(!user)
            {
              let newUser = {
                first_name: profile._json.login,
                last_name:"github",
                age: 77,
                email:profile._json.email,
                password:"",
                rol:"usuario"
              }
              let result = await userMan.addUser(newUser)
              const access_token = generateToken(newUser)
              done(null, { user: result, access_token })
            }
            else
            {
              const access_token = generateToken(user)
              done(null, { user: user, access_token })
            }
          }catch(error)
          {
            return done(error)
          }
        }
        ))
}

export default initializePassport