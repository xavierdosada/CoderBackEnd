import { Router } from 'express'
import viewsRouter from '../routes/views.routes.js'
import sessionRouter from '../routes/sessions.router.js'
import productsRouter from '../routes/products.router.js'
import cartsRouter from '../routes/carts.router.js'
import mockRouter from '../routes/mock.router.js'


const routes = Router()

routes.use('/api/session', sessionRouter)
routes.use('/api/products', productsRouter)
routes.use('/api/carts', cartsRouter)
routes.use('/', viewsRouter)
routes.use('/mockingproducts', mockRouter)

export default routes;