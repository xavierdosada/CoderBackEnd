import userDTO from "../dao/dtos/user.dto.js"
import { UserMongoMgr } from "../dao/mongo/user.mongo.js"
import { productsRepository } from "../repositories/index.js"

const product_repository = productsRepository

export const register = async (req, res) => {
    res.status(201).send({ status: 'success', message: "The user has been registered" })
}

export const failRegister = async (req, res) => {
    res.status(400).send({ status: 'error', error: 'There was an error registering the user' })
}

export const login = async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials' })
    res.cookie('coderCookieToken', req.user, { httpOnly: true }).send({ status: "success", message: "cookie set" })
}

export const failLogin = async (req, res) => {
    req.logger.error(error)
    res.status(400).send({ status: "error", error: 'failed Login' })
}

export const github = async (req, res) => {
    
}

export const githubcallback = async (req, res) => {
    try {
        req.session.user = req.user
        req.logger.debug(req.session.user)
        res.redirect('/products')
    } catch (error) {
        req.logger.error(error)
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (!err){
            req.logger.error(err)
            res.redirect('/api/session/login')
        } else res.send({ status: 'Logout ERROR', body: err })
        
    })
}

export const current = async (req, res) => {
    const currentUser = new userDTO(req.user)
    res.status(200).send({currentUser: currentUser})
}

export const isOwnCart = async (req, res) => {
    const user_mgr = new UserMongoMgr()
    const { cid } = req.params
    //buscar el cart del usuario en la base de datos
    const { email } = req.user.user
    const infoUser = await user_mgr.getUserByEmail(email)
    const cartId = infoUser._doc.cart.toString()
    //verificar que tenga agregado el cid en el cart
    if(cartId === cid){
        return true
    }
    req.logger.warning('No tiene permisos')
    throw new Error("El producto no se puede agregar porque el carrito no es propio")
}

export const isOwnProduct = async (req, res) => {
    const { email } = req.user.user
    const { pid } = req.params
    const prod = await product_repository.getProductById(pid)
    const owner_email = prod._doc.owner.createdBy
    if(email === owner_email){
        return true
    }
    req.logger.warning('No tiene permisos')
    throw new Error("El producto no se puede agregar porque el producto no es propio")
}   

//MIDDLEWARES
export const isAdmin = async (req, res, next) => {
    if(req.user.user.role === 'admin'){
        return next();
    }
    req.logger.warning('No es admin / sin permisos')
    res.status(403).send("No tienes permisos suficientes")
}

export const isPremium = async (req, res, next) => {
    if(req.user.user.role === 'premium'){
        return next();
    }
    req.logger.warning('No es premium / sin permisos')
    res.status(403).send("No tienes permisos suficientes")
}

export const isUser = async (req, res, next) => {
    if(req.user.user.role === 'user'){
        return next();
    }
    req.logger.warning('No es user / no tiene permisos de usuario')
    res.status(403).send("No tiene permisos de usuario para realizar esta acción")
}

export const isUserOrPremium = async (req, res, next) => {
    if((req.user.user.role === 'user' || req.user.user.role === 'premium') && await isOwnCart()){
        return next();
    }
    req.logger.warning('No es user o premium / no tiene permisos de usuario')
    res.status(403).send("No tiene permisos de usuario para realizar esta acción")
}

export const deleteValidations = async (req, res, next) => {
    if (req.user.user.role === 'admin'){
        return next()
    }

    if (req.user.user.role === 'premium'){
        if(await isOwnProduct(req, res)){
            return next()
        }
    }

    req.logger.warning('No tiene permisos')
    res.status(400).send("El producto no se puede eliminar porque el producto no es propio o no tiene suficientes permisos")
}