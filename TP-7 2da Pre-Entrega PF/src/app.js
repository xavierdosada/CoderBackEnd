import express from "express";
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { Server } from 'socket.io'
import mongoose from "mongoose";
import sensitiveInfo from "./mongoDBsensitiveInfo.js";
import { messageDBManager } from "./dao/messagesDBManager.js";

const app = express();
const port = 8080
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = sensitiveInfo
const mongo = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
const serverMongo = app.listen(port, () => {console.log('connected to mongodb on port: ' + port)})
const connection = mongoose.connect(mongo)

export const io = new Server(serverMongo)

const messagesDBM = new messageDBManager();

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

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