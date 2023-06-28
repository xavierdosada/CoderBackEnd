import mongoose from "mongoose";

const collection = 'carts'

const schema = mongoose.Schema({
    product: {
        type: [
            {
                productID: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 0,
                    min: 0
                }
            }
        ],
        default: []
    }
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;