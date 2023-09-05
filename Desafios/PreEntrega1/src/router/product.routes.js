import { Router } from "express"
import ProductManager from "../controllers/ProductManager.js"

const prodRouter = Router()
const product = new ProductManager()


prodRouter.put("/:id", async (req,res) => {
    let id = req.params.id
    let updProd = req.body
    res.send(await product.updProducts(id, updProd))
})
prodRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProdById(id))
})
prodRouter.get("/", async (req, res) => {
    res.send(await product.getProducts())
})
prodRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.delProducts(id))
})
prodRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

export default prodRouter