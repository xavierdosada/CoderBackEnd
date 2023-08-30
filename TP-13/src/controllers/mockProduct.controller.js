import { mockProducts } from "../utils/mocks.js";

export const generateProducts = (req, res) => {
    const products = []
    for(let i = 0; i < 99; i++){
        products.push(mockProducts())
    }

    res.send(products)
}