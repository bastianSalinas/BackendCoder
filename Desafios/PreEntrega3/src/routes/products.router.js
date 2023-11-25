import { Router } from "express";
import { Products } from '../dao/factory.js'
import ProductDTO from "../dao/DTOs/product.dto.js";
import ProductRepository from "../repositories/Products.repository.js";

const router = Router()

const productsServices = new Products()

router.get("/", async (req, res) => {
    let result = await productsServices.get()
    res.send({ status: "success", payload: result })
})

router.post("/", async (req, res) => {
    let { description, image, price, stock, category, availability } = req.body

    let prod = new ProductDTO({ description, image, price, stock, category, availability })
    console.log(prod)
    let result = await ProductRepository.createProduct(prod)
    console.log(result)
})

export default router