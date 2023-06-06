import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { Server } from 'socket.io'

const app = express();
const httpServer = app.listen(8080, () => {console.log('Server started on port 8080')})

export const io = new Server(httpServer)

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
    console.log('Cliente conectado en el back', socket.id)
    socket.on('message', (data) => {
        console.log(data)
    })
})

