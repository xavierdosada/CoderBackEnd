import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'users'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
        default: 'false'
    }
})

//plugin de paginación
schema.plugin(mongoosePaginate);
const usersModel = mongoose.model(collection, schema);

export default usersModel;