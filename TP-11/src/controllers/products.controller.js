import { ProductDBManager } from "../dao/ProductDBManager.js";
import { io } from '../app.js'
import productsModel from "../dao/models/productsModel.js";
import formatResponse from "../dao/formatResponse.js";

const pManager = new ProductDBManager()

export const pagination = async (req, res) => {
    let { limit, page, sort } = req.params
    let objSort = {}

    if(sort){
        objSort = {price: sort}
    }

    const options = { 
        limit: limit ? parseInt(page) : 10,
        page: page ? parseInt(page) : 1,
        sort: objSort
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`
    
    try {
        const paginate = await productsModel.paginate(req.body, options)
        const response = formatResponse(paginate, options, baseUrl, 'success')
        res.status(200).send(response)
    } catch (error) {
        const response = formatResponse(paginate, options, baseUrl, 'error')
        res.status(400).send(response)
    }
}

export const addProduct = async (req, res) => {
    const newProduct = req.body
    const { title, description, code, price, status, stock, category} = newProduct
    try {
        if (!title || !description || !code || !price || !status || !stock || !category){
            throw new Error("Faltan campos")
        }
        //Valido los tipo de datos requeridos
        if ( 
            typeof title        !== "string" || 
            typeof description  !== "string" || 
            typeof code         !== "string" || 
            typeof category     !== "string"
        ){
            throw new Error("Verifique que title, description, code o category sean de tipo string")
        }
        if ( 
            typeof price !== "number" || 
            typeof stock !== "number"
        ){
            throw new Error("Verifique que price o stock sean de tipo number")
        }
        
        const product = await pManager.getProductByCode(code)
        if(product){
            throw new Error('Code ya existe')
        } 
            
        const prodAdded = await pManager.addProduct(newProduct)
        const products = await pManager.getProducts() //productos actualizados
        io.emit('updateproducts', products) //los envio por websockets al front
        res.status(201).send({status: "success", product: prodAdded })
    } catch(error){
        res.status(400).send({error: error.message})
    }
} 

export const getProductById = async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await pManager.getProductById(pid)
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

export const updateProduct = async (req, res) => {
    const { pid } = req.params
    const bodyToUpdate = req.body
    try {
        const productExist = await pManager.getProductById(pid)
        if(!productExist){
            throw new Error("No existe el producto que quiere actualizar")
        }

        const statusUpdate = await pManager.updateProduct(pid, bodyToUpdate)
        const products = await pManager.getProducts() //productos actualizados
        io.emit('updateproducts', products) //los envio por websockets al front
        res.status(200).send({message: statusUpdate});
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    const { pid } = req.params
    try {
        const productExist = await pManager.getProductById(pid)
        if(!productExist){
            throw new Error("No existe el producto que quiere eliminar")
        }

        const statusDelete = await pManager.deleteProduct(pid)
        const products = await pManager.getProducts() //productos actualizados
        io.emit('updateproducts', products) //los envio por websockets al front
        res.status(200).send({message: statusDelete})
    } catch(error){
        res.status(404).send({error: error.message})
    }
}