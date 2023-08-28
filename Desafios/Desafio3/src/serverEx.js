import express from "express"
import ProductManager from "./components/ProductManager.js"

//Creamos la variable para acceder a componentes de express
const serverCon = express()
serverCon.use(express.urlencoded({extended : true}))

//Definimos propiedades de  ProductManager en este archivo y no en ProductManager.js
const products = new ProductManager()
const readProductsServer = products._readProducts()

serverCon.get("/products", async (req,res) => {

    //Definimos el limite de propductos a mostrar
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await readProductsServer)

    let allProducts = await readProductsServer
    let prodLimit = allProducts.slice(0,limit)
    res.send(prodLimit)
    //Esto funciona tambien con http://localhost:8080/products/?limit=3
})

serverCon.get("/products/:id", async(req,res) =>{
    let id = parseInt(req.params.id)
    let allProducts = await readProductsServer
    let prodById = allProducts.find(product => product.id === id)
    res.send(prodById)
})

const PORT = 8080
const server = serverCon.listen(PORT, () => {
    console.log(`Express por LocalHost ${server.address().port}`)
})
//Se enciende el servidor y se coloca mensaje en caso de errores
server.on("error", (error) => console.log(`Error del servidor ${error}`))
