import express from "express";
import handlebars from 'express-handlebars'
import mongoose from "mongoose";
import sensitiveInfo from "./sensitiveInfo.js";
import __dirname from './utils.js'
import { Server } from 'socket.io'
import { messageDBManager } from "./dao/messagesDBManager.js";
//SESSION
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
//ROUTES
import viewsRouter from './routes/views.routes.js'
import sessionRouter from './routes/sessions.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
//Passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();
const port = 8080
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = sensitiveInfo
const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
const serverMongo = app.listen(port, () => {console.log('connected to mongodb on port: ' + port)})
const connection = mongoose.connect(mongoUrl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

export const io = new Server(serverMongo)

const messagesDBM = new messageDBManager();

app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    store: new MongoStore({
        mongoUrl: mongoUrl,
        ttl: 3600
    }),
    secret: "123asd123",
    resave: false,
    saveUninitialized: false
}))

initializePassport();
app.use(passport.initialize())
app.use(passport.session())


app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/session', sessionRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

io.on('connection', (socket) => {
    socket.on('message', async (data) => {
        socket.emit('')
        await messagesDBM.addMessage(data)
        const messages = await messagesDBM.getMessages()
        io.emit('messageLogs', messages)
    })

    socket.on('authenticated', (data) => {
        socket.broadcast.emit('newUserConnected', data)
    })
})