import { Router } from "express";
//import { Carts } from '../dao/factory.js'
import CartDTO from "../dao/DTOs/cart.dto.js";
import CartRepository from "../repositories/Carts.repository.js";
import Carts from "../dao/mongo/carts.mongo.js";

const router = Router()

const cartsServices = new Carts()

router.get("/", async (req, res) => {
    let result = await cartsServices.get()
    res.send({ status: "success", payload: result })
})

router.post("/", async (req, res) => {
    let { products } = req.body

    let cart = new CartDTO({ products })
    console.log(cart)
    let result = await CartRepository.createCart(cart)
    console.log(result)
})

export default router