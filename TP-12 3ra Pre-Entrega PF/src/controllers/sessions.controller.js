import userDTO from "../dao/dtos/user.dto.js"

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
    res.status(400).send({ status: "error", error: 'failed Login' })
}

export const github = async (req, res) => {
    
}

export const githubcallback = async (req, res) => {
    try {
        req.session.user = req.user
        console.log(req.session.user)
        res.redirect('/products')
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
}

export const logout = async (req, res) => {
    req.session.destroy(err => {
        if (!err) res.redirect('/api/session/login')
        else res.send({ status: 'Logout ERROR', body: err })
    })
}

export const current = async (req, res) => {
    const currentUser = new userDTO(req.user)
    res.status(200).send({currentUser: currentUser})
}

//MIDDLEWARES
export const isAdmin = async (req, res, next) => {
    if(req.user.user.role === 'admin'){
        return next();
    }
    res.status(403).send("No tienes permisos suficientes")
}

export const isUser = async (req, res, next) => {
    if(req.user.user.role === 'user'){
        return next();
    }
    res.status(403).send("No puede modificar el carrito del usuario")
}