import mongoose from "mongoose";
import config from '../config/config.js'
export let Carts
export let Products
export let Users
switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(config.mongo_url)
        const { default: CartsMongo } = await import('./mongo/carts.mongo.js')
        const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
        const { default: UsersMongo } = await import('./mongo/users.mongo.js')
        Carts = CartsMongo
        Products = ProductsMongo
        Users = UsersMongo
        break;
    case "MEMORY":
        const { default: CartsMemory } = await import("./memory/carts.memory.js")
        const { default: ProductsMemory } = await import("./memory/products.memory.js")
        const { default: UsersMemory } = await import("./memory/users.memory.js")
        Carts = CartsMemory
        Products = ProductsMemory
        Users = UsersMemory
        break
    default:

}