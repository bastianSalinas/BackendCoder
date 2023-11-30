import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from '../utils.js'
import UserMongo from '../dao/mongo/users.mongo.js'

const userMan = new UserMongo()
const LocalStrategy = local.Strategy
const encryptPassport = () => {
    passport.use(new LocalStrategy(
        async (email, password, done) => {
            console.log(email)
            console.log(password)
            try {
                const user = await userMan.getUserByEmail(email);

                if (!user) {
                    // Usuario no encontrado
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    // Contraseña incorrecta
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                // Autenticación exitosa
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userMan.getUserById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

export default encryptPassport;