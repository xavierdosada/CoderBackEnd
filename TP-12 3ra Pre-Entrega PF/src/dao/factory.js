import { CartMongoMgr } from '../dao/mongo/cart.mongo.js'
import { ProductMongoMgr } from '../dao/mongo/product.mongo.js';
import { CartMemoryMgr } from '../dao/memory/cart.memory.js';
import { ProductMemoryMgr } from '../dao/memory/product.memory.js'
import env from '../config/config.js'

export default class DaoFactory {
    constructor(){}

    static getCartDao(){
        const dao = env.PERSISTANCE || 'mongo';
        switch(dao){
            case 'mongo':
                return new CartMongoMgr();
            case 'memory':
                return new CartMemoryMgr();
            default:
                return new CartMongoMgr();
        }
    }

    static getProductDao(){
        const dao = env.PERSISTANCE || 'mongo';
        switch(dao){
            case 'mongo':
                return new ProductMongoMgr();
            case 'memory':
                return new ProductMemoryMgr();
            default:
                return new ProductMongoMgr();
        }
    }
}