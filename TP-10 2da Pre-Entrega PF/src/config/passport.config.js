import passport from 'passport'
import local from 'passport-local'
import userService from '../dao/models/UserModel.js'
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from '../utils.js'
import sensitiveInfo from '../sensitiveInfo.js'

const { GITHUB_CLIENTID, GITHUB_CLIENTSECRET, GITHUB_CALLBACKURL} = sensitiveInfo;

const localStrategy = local.Strategy
const initializePassport = () => {
    passport.use('register', new localStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, dob, role } = req.body
        try {
            let user = await userService.findOne({ email })
            if (user) return done(null, false, { message: 'The email already exists' })
            const newUser = {
                first_name,
                last_name,
                email,
                dob,
                password: createHash(password),
                role
            }
            user = await userService.create(newUser)
            // user = await userService.findOne({ email }) //Vuelvo a buscar el usuario en la bd para obtenerlo con el _id y poder serializarlo
            return done(null, user)
        } catch (error) {
            return done({ message: `There was an error creating the user: ${error.message}` })
        }
    }));

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userService.findOne({ email: username })

            if (!user) return done(null, false, { message: `The user doesn't exist` })
            if (!isValidPassword(user, password)) return done(null, false, { message: `The email and password do not match` })

            return done(null, user)
        } catch (error) {
            return done({ error: `Error login user: ${error.message}` })
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: GITHUB_CLIENTID,
        clientSecret: GITHUB_CLIENTSECRET,
        callbackURL: GITHUB_CALLBACKURL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log({ profile })
            let user = await userService.findOne({ email: profile._json.email })
            if (user) return done(null, user)
            const newUser = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: 10,
                password: ''
            }
            user = await userService.create(newUser)
            return done(null, user)
        } catch (error) {
            return done({ error: `Error creating user via github: ${error.message}` })
        }
    }));

    //SERIALIZACIÓN Y DESERIALIZACIÓN
    passport.serializeUser((user, done) => {
        try {
            done(null, user._id)
        } catch (error) {
            done({ error: error.message })
        }
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userService.findById(id)
            done(null, user)
        } catch (error) {
            done({ error: error.message })
        }
    });

    //ESTRATEGIA CURRENT
    passport.use('current', new localStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
            let user = await userService.findOne({ email })
            if (user) return done(null, false, { message: 'The email already exists' })
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            user = await userService.create(newUser)
            // user = await userService.findOne({ email }) //Vuelvo a buscar el usuario en la bd para obtenerlo con el _id y poder serializarlo
            return done(null, user)
        } catch (error) {
            return done({ message: `There was an error creating the user: ${error.message}` })
        }
    }));
}

export default initializePassport;