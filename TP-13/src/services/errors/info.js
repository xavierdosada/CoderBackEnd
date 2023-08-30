export const generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * title: needs to be a String, recieved ${product.title}
    * description: needs to be a String, recieved ${product.description}
    * price: needs to be a Number, recieved ${product.price}
    * status: needs to be a Boolean, recieved ${product.status}
    * code: needs to be a String, recieved ${product.code}
    * stock: needs to be a Number, recieved ${product.stock}
    * category: needs to be a String, recieved ${product.category}`
}