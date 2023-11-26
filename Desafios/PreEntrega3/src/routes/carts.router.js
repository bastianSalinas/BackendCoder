import { Router } from "express";
//import { Carts } from '../dao/factory.js'
import CartDTO from "../dao/DTOs/cart.dto.js";
import TicketDTO from "../dao/DTOs/ticket.dto.js";
import CartRepository from "../repositories/Carts.repository.js";
import TicketRepository from "../repositories/Tickets.repository.js";
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
router.post("/:cid/purchase", async (req, res) => {
    let { description, price, stock, category, availability, quantity, ticket } = req.body
    if(stock <= 0){
        return "El producto que se quiere comprar no tiene stock"
    }
    if(quantity > stock){
            return "La cantidad ingresada es mayor al stock disponible"
    }else{
        totalStock = stock - quantity
        let ticketFormat = new TicketDTO({ ticket })
        let result = await TicketRepository.createTicket(ticketFormat)
        console.log(result)
    }
})

export default router