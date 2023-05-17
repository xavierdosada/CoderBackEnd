class Product {
    constructor() {
        this.products = [];
    }
 
    addProducts(title, description, price, thumbnail, code, stock) {
        if (title && description && price && thumbnail && code && stock) {  
            const codexist = this.products.some( product => product.code === code)
                console.log({codexist})
            if (codexist === false) {
                let NewProds = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
                }

                this.products.push( NewProds )
            } else {
                console.error("error el code establecido ya existe")
            }
        } else {
            console.log("error por favor complete todos los campos para agregar un producto")
        }
    }
 }
 
//  let Prods = []
 
 const ProductManager = new Product ()

 ProductManager.addProducts("gta", "disco fisico", "$16000", "imagen del gta", 1, "2000")
 ProductManager.addProducts("ark", "disco fisico", "$10000", "imagen del ark", 2, "1200")
 ProductManager.addProducts("gta", "disco fisico", "$16000", "imagen del gta", 2, "2000")
 ProductManager.addProducts("ark", "disco fisico", "$10000", "imagen del ark", 3, "1200")
